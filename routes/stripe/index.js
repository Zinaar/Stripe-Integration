'use strict'


module.exports = async function (fastify, opts) {
    /**
     * create simple payment intent, providing other data requires to create client and session
     */
    fastify.post('/create-payment-intent', async (request, reply) => {
        const  { amount, currency } = request.body
        try {
            const paymentIntent = await fastify.createPaymentIntent(amount, currency);
            reply.send({ clientSecret: paymentIntent.client_secret , paymentIntentId: paymentIntent.id});
        } catch (error) {
            reply.status(500).send({ error: 'Internal server error', error });
        }
    });

  /**
   * this endpoint is used to manually confirm payment intent, real paymentMethod hash can be provided
   */
    fastify.post('/confirm-payment-intent', async (request, reply) => {
        const  { id, paymentMethod, returnUrl } = request.body
        try {

            /**
             * we can retreive payment methodId or chargeId from this call
             */
             await fastify.confirmPaymentIntent(id, paymentMethod, returnUrl );
            reply.status(200).send();
        } catch (error) {
            reply.status(500).send({ error: 'Internal server error', error });
        }
    });

  /**
   * this endpoint is used to retreive payment intent status
   */
    fastify.get('/retreive-payment-status', async (request, reply) => {
        const  { id } = request.query
        try {
            const paymentIntent =  await fastify.retreivePaymentIntent(id );
            reply.status(200).send({status: paymentIntent.status, amount: paymentIntent.amount / 100, currency: paymentIntent.currency});
        } catch (error) {
            reply.status(500).send({ error: 'Internal server error', error });
        }
    });
}
