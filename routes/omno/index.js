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
       console.log('omno received');


        // Return a 200 response to acknowledge receipt of the event
        reply.status(200).send();
    });
};
