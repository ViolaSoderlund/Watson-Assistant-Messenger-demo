const CREDENTIALS = require("./webhook_contract");

const request = require('request');

module.exports = function(app, message_handler) {
    add_weebhook_endpoint(app, message_handler);
    add_webhook_verification(app);
};

/*

This code creates a /webhook endpoint that accepts POST requests, checks the request is a webhook event, then parses the message. 
This endpoint is where the Messenger Platform will send all webhook events.

Note that the endpoint returns a 200OK response, which tells the Messenger Platform the event has been received and does not need to be resent. 
Normally, you will not send this response until you have completed processing the event.

*/
function add_weebhook_endpoint(app, message_handler) {
    // Creates the endpoint for our webhook 
    app.post('/webhook', (req, res) => {  
        let body = req.body;
  
        // Checks this is an event from a page subscription
        if (body.object === 'page') {
            // Iterates over each entry - there may be multiple if batched
            body.entry.forEach(function(entry) {
                // Gets the message. entry.messaging is an array, but will only ever contain one message, so we get index 0
                let webhook_event = entry.messaging[0];

                const timestamp = new Date(webhook_event.timestamp);

                console.log("\n// Webhook event: ");
                console.log("/- sender: " + webhook_event.sender.id);
                console.log("/- recipient: " + webhook_event.recipient.id);
                console.log("/- time: " + timestamp.getHours() + ":" + timestamp.getMinutes() + ", " + timestamp.getDate() + "/" + timestamp.getMonth());
                console.log("/- message: " + webhook_event.message.text);
                console.log("");

                if (webhook_event.message) {
                    handleMessage(webhook_event.sender.id, webhook_event.message.text, message_handler);        
                } 
            });
  
            // Returns a '200 OK' response to all requests
            res.status(200).send('EVENT_RECEIVED');
        } 
        else {
            // Returns a '404 Not Found' if event is not from a page subscription
            res.sendStatus(404);
        }
    });
}

/*

This code adds support for the Messenger Platform's webhook verification to your webhook. This is required to ensure your webhook is authentic and working.

The verification process looks like this:

- You create a verify token. This is a random string of your choosing, hardcoded into your webhook.
- You provide your verify token to the Messenger Platform when you subscribe your webhook to receive webhook events for an app.
- The Messenger Platform sends a GET request to your webhook with the token in the hub.verify parameter of the query string.
- You verify the token sent matches your verify token, and respond with hub.challenge parameter from the request.
- The Messenger Platform subscribes your webhook to the app.

*/

function add_webhook_verification(app) {
    // Adds support for GET requests to our webhook
    app.get('/webhook', (req, res) => {
        // Parse the query params
        let mode = req.query['hub.mode'];
        let token = req.query['hub.verify_token'];
        let challenge = req.query['hub.challenge'];
      
        // Checks if a token and mode is in the query string of the request
        if (mode && token) {
            // Checks the mode and token sent is correct
            if (mode === 'subscribe' && token === CREDENTIALS.verifyToken) {
                // Responds with the challenge token from the request
                console.log('WEBHOOK_VERIFIED');

                res.status(200).send(challenge);
            } 
            else {
                console.log(token + " did not match the verification token.");

                // Responds with '403 Forbidden' if verify tokens do not match
                res.sendStatus(403);      
            }
        }
    });
}

function handleMessage(sender_psid, received_message, message_handler) {
    message_handler(received_message).then(message => {
        // Check if the message contains text
        if (received_message) {    
            // Create the payload for a basic text message
            const response = {
                "text": message
            };

            // Sends the response message
            callSendAPI(sender_psid, response);
        } 
    });    
}

function callSendAPI(sender_psid, response) {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    }

    // Send the HTTP request to the Messenger Platform
    request({
            "uri": "https://graph.facebook.com/v3.2/me/messages",
            "qs": { "access_token": CREDENTIALS.pageAccessToken },
            "method": "POST",
            "json": request_body
        }, 
        (err, res, body) => {
            if (!err) {
                console.log('\nSuccessfully sent response.');
                console.log('- Response: ' + response.text);
                console.log("");
            } 
            else {
                console.error("ERROR: " + err);
            }
        }
    );
}