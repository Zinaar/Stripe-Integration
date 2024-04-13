# Getting Started with [Fastify-CLI](https://www.npmjs.com/package/fastify-cli)
This project was bootstrapped with Fastify-CLI.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

To start the app in dev mode.\

Open [http://localhost:3000/static/checkout.html](http://localhost:3000/static/checkout.html) to view it in the browser. this step is optional


### Avialable Endpoints
1. Create Payment Intent
Description: Create a simple payment intent, providing other data required to create client and session.
Method: POST
URL: /stripe/create-payment-intent
Request Body:
amount (required, number): The amount of the payment.
currency (required, string): The currency of the payment.
Response:
clientSecret (string): The client secret of the payment intent. this could be used in your client application to handle intent confirmation
paymentIntentId (string): The ID of the payment intent.
2. Confirm Payment Intent
Description: Manually confirm a payment intent. Real paymentMethod hash can be provided.
Method: POST
URL: /stripe/confirm-payment-intent
Request Body:
id (required, string): The ID of the payment intent.
paymentMethod (required, string): The payment method hash. provide "pm-card-visa" for testing purposes
returnUrl (optional, string): The URL to return to after confirmation.
Response:
Status Code: 200 OK
3. Retrieve Payment Status
Description: Retrieve payment intent status.
Method: GET
URL: /stripe/retrieve-payment-status
Query Parameters:
id (required, string): The ID of the payment intent.
Response:
status (string): The status of the payment intent.
amount (number): The amount of the payment (in cents).
currency (string): The currency of the payment.

### Stripe Webhooks 
Stripe webhooks provide a way for your application to receive real-time notifications about events that occur in your Stripe account, such as payment intent updates, charges, refunds, etc. These notifications are sent as HTTP POST requests to a specified endpoint in your application.

How it Works
When an event occurs in your Stripe account (e.g., a payment is made, a payment intent is updated), Stripe sends a POST request to the webhook endpoint URL that you specify. This request contains JSON data representing the event that occurred.

Setting Up Webhooks
To set up webhooks in your application:

Create a Webhook Endpoint: Create an endpoint in your application to receive the webhook notifications. This endpoint should be capable of handling POST requests.

Configure Webhook Endpoint in Stripe Dashboard: In the Stripe Dashboard, configure the webhook endpoint URL where Stripe should send the notifications. You can specify the types of events you want to receive notifications for.

Handle Webhook Events: Implement logic in your application to handle the webhook events received from Stripe. This typically involves parsing the JSON data in the request and performing the necessary actions based on the event type.

Stripe Payment Intent Events
For handling payment intent events specifically, you'll receive notifications whenever there is an update to a payment intent, such as when it is created, requires confirmation, succeeds, fails, etc. These events allow you to keep track of the status of payment intents and take appropriate actions in your application, such as updating order status or sending confirmation emails to customers.

Example Webhook Endpoint Handler
javascript
Copy code
// Example webhook endpoint handler
fastify.post('/stripe-webhook', async (request, reply) => {
  const event = request.body;

  // Handle the event based on its type
  switch (event.type) {
    case 'payment_intent.created':
      // Handle payment intent created event
      break;
    case 'payment_intent.requires_confirmation':
      // Handle payment intent requires confirmation event
      break;
    case 'payment_intent.succeeded':
      // Handle payment intent succeeded event
      break;
    case 'payment_intent.failed':
      // Handle payment intent failed event
      break;
    // Add more cases for other payment intent events as needed
    default:
      // Ignore unknown event types
  }

  // Send a response to acknowledge receipt of the event
  reply.status(200).send({ received: true });
});
Securing Webhook Endpoints
It's important to secure your webhook endpoints to prevent unauthorized access and ensure the integrity of the data received from Stripe. You can use webhook signatures to verify that the requests are coming from Stripe and haven't been tampered with.

Learn More
For more information on setting up and handling webhooks in Stripe, refer to the [Stripe Webhooks Documentation](https://docs.stripe.com/api/webhook_endpoints).



### Step-by-Step Guide to Using the App
Send Payment Intent to Create

To initiate a payment, send a POST request to the /create-payment-intent endpoint with the following data:

amount (required, number): The amount of the payment.
currency (required, string): The currency of the payment.
Example Request:

bash
Copy code
curl -X POST [http://localhost:3000/create-payment-intent] \
-H "Content-Type: application/json" \
-d '{"amount": 1000, "currency": "USD"}'
Example Response:

json
Copy code
{
  "clientSecret": "pi_1Jxxx...", 
  "paymentIntentId": "pi_1Jxxx..."
}
Confirm Payment Intent

After receiving the payment intent details, you can confirm the payment by sending a POST request to the /confirm-payment-intent endpoint with the following data:

id (required, string): The ID of the payment intent.
paymentMethod (required, string): The payment method hash.
returnUrl (optional, string): The URL to return to after confirmation.
Example Request:

bash
Copy code
curl -X POST [http://localhost:3000/confirm-payment-intent] \
-H "Content-Type: application/json" \
-d '{"id": "pi_1Jxxx...", "paymentMethod": "pm_1Jxxx...", "returnUrl": "https://example.com/return"}'
Example Response:

json
Copy code
{}
Check Payment Status

Alternatively, you can check the status of a payment intent at any time by sending a GET request to the /retrieve-payment-status endpoint with the ID of the payment intent as a query parameter:

id (required, string): The ID of the payment intent.
Example Request:

bash
Copy code
curl -X GET '[http://localhost:3000/retrieve-payment-status?id=pi_1Jxxx...]'
Example Response:

json
Copy code
{
  "status": "succeeded",
  "amount": 10.0,
  "currency": "USD"
}
Explore Further

## Learn More

To learn Fastify, check out the [Fastify documentation](https://fastify.dev/docs/latest/).
