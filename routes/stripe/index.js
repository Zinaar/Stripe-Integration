'use strict'

module.exports = async function (fastify, opts) {
    fastify.post('/create-payment-intent', async (request, reply) => {
        const amount = 10
        const currency = 'usd'
        const {items} = request.body
        try {
            const paymentIntent = await fastify.createPaymentIntent(amount, currency, items);
            reply.send({ clientSecret: paymentIntent.client_secret });
        } catch (error) {
            reply.status(500).send({ error: 'Internal server error' });
        }
    });
}
