'use strict'

const fp = require('fastify-plugin');

async function getBearerToken(amount, currency) {
   
  
}


async function fastifyOmno(fastify, options) {
    fastify.decorate('getBearerToken', getBearerToken);
}

module.exports = fp(fastifyOmno);
