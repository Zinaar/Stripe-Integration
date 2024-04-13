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
        })
  
}

async function retreivePaymentIntent(id) {
    return stripe.paymentIntents.retrieve(id)
}

async function confirmPaymentIntent(id, paymentMethod, returnUrl) {
    return stripe.paymentIntents.confirm(id, {payment_method: paymentMethod, return_url:returnUrl, use_stripe_sdk:true})
}

async function fastifyStripe(fastify, options) {
    fastify.decorate('stripe', stripe);
    fastify.decorate('createPaymentIntent', createPaymentIntent);
    fastify.decorate('retreivePaymentIntent' , retreivePaymentIntent)
    fastify.decorate('confirmPaymentIntent', confirmPaymentIntent);
}

module.exports = fp(fastifyStripe);
