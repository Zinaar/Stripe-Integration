'use strict';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async function (fastify, opts) {
    fastify.addContentTypeParser(
        'application/json',
        { parseAs: 'buffer' },
        function (req, body, done) {
          try {
            var newBody = {
              raw: body
            }
            done(null, newBody)
          } catch (error) {
            error.statusCode = 400
            done(error, undefined)
          }
        }
      )

    fastify.post('/stripe', async (request, reply) => {
        const sig = request.headers['stripe-signature'];
  
        let event;
        try {
           
            event = stripe.webhooks.constructEvent(
                request.body.raw,
                sig,
                process.env.STRIPE_WEBHOOK_SECRET
            );
            console.log('EVENT: ', event);
            reply.status(200)
        } catch (err) {
            console.error('Error verifying webhook signature:', err.message);
            reply.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }

       /**
        * Note  handle all possible events that require an action
        */
        switch (event.type) {
            case 'payment_intent.created':
                const paymentIntentCreated = event.data.object;
               //  update db entity with payment intent id
                break;
            case 'payment_intent.succeeded' :
            // create payment event entry
            // update payment entity status
            break
            case 'payment_intent.payment_failed' :
              // create payment event entry
              // update payment entity status
              break
              case 'payment_intent.processing' :
                // create payment event entry
                // update payment entity status
              break
            default:
                console.log(`Unhandled event type ${event.type}`);
        }

       /**
        * return ack to stripe api
        */
        reply.status(200).send({received: true});
    });
};
