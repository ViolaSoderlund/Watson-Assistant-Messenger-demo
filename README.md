# HackYourWorld Watson Assistant Node.js demo

Clone the project: `git clone git@git.eu-gb.bluemix.net:viola.soderlund/hackyourworld-watson-assistant-node.js-demo.git`

Install the node modules: `npm install`.

Messager cannot call on a localhost adress. Expose your local server to an external URL throu using a service like [ngrok][].

## IBM Watson Assistant v2

[Visit the documentation][].

The nessesary authorization values specified under `watson_assistant_contract.js` can be obtained at your Watson Assistant service dashboard in your IBM Cloud console.

## Facebook Messanger integration

Check out this [getting started guide][] for more fun functions to add to this template.

### Set up your Facebook app

A Facebook app is what links your dedicated facebook page to your node.js app's webhook, and is where you will configure various permissions for your API, generate access tokens, and choose what events are sent to your webhook.

Setup your Facebook app with Facebook's [setup guide][]

As long as your webhook URL is dynamic, you'll have to edit your Facebook application's webhook events any time it changes.

#### `webhook_contract.js`

To connect your node.js app with your Facebook app, you need a `verifyToken` and a `pageAccessToken`. For that, go to: https://developers.facebook.com/apps/<YOUR APP ID>/messenger/settings/.

Choose your own verify token string and add its value to `verifyToken` in your contract file. Then configure your Facebook app accordingly at Webhooks by clicking on Edit events.

The `pageAccessToken` can be generated under the Token Generation section.


### Test your application's functionality

Test your webhook verification by submitting: `curl -X GET "localhost:1337/webhook?hub.verify_token=<YOUR_VERIFY_TOKEN>&hub.challenge=CHALLENGE_ACCEPTED&hub.mode=subscribe"`

Test your webhook events by submitting: `curl -H "Content-Type: application/json" -X POST "localhost:1337/webhook" -d '{"object": "page", "entry": [{"messaging": [{"message": "TEST_MESSAGE"}]}]}'`

[ngrok]: https://ngrok.com/
[Visit the documentation]: https://cloud.ibm.com/apidocs/assistant-v2?code=node#authentication
[setup guide]: https://developers.facebook.com/docs/messenger-platform/getting-started/app-setup
[getting started guide]: https://developers.facebook.com/docs/messenger-platform/getting-started/quick-start 