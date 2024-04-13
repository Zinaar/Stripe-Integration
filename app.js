'use strict'

const path = require('node:path')
const AutoLoad = require('@fastify/autoload')
const fastifyStatic = require('@fastify/static');
const fastifyEnv = require('@fastify/env');



// Pass --options via CLI arguments in command to enable these options.
const options = {}
require('dotenv').config();

const envSchema = {
  type: 'object',
  required: ['STRIPE_SECRET_KEY', 'STRIPE_WEBHOOK_SECRET'],
  properties: {
      STRIPE_SECRET_KEY: { type: 'string' },
      STRIPE_WEBHOOK_SECRET: { type: 'string' }
  }
};

module.exports = async function (fastify, opts) {
  // Place here your custom code!
  fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'public'),
    prefix: '/static',
  });

  fastify.register(fastifyEnv, {
    schema: envSchema,
    dotenv: true
});

/** 
 * load the database
 */

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })
}

module.exports.options = options
