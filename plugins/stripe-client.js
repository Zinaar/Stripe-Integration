const fp = require('fastify-plugin');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const calculateOrderAmount = (amount) => {
    // you can provide items here to calculate their total price
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    // amount should be in cents for stripe API
    return amount * 100;
  };


async function createPaymentIntent(amount, currency) {
        return stripe.paymentIntents.create({
            amount: calculateOrderAmount(amount),
            currency: currency,
        }).then((res) => {
            console.log(res);
            return res
        }).catch((e) => {
            console.log(e);
            throw e
        })
  
}

async function confirmPaymentIntent(clientId, paymentMethod, returnUrl) {
    return stripe.paymentIntents.confirm(clientId, {payment_method: paymentMethod, return_url:returnUrl}).then((res) => {
        console.log(res);
        return res
    }).catch((e) => {
        console.log(e);
        throw e
    })
}

async function fastifyStripe(fastify, options) {
    fastify.decorate('stripe', stripe);
    fastify.decorate('createPaymentIntent', createPaymentIntent);
    fastify.decorate('confirmPaymentIntent', confirmPaymentIntent);
}

module.exports = fp(fastifyStripe);
