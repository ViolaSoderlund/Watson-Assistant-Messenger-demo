# HackYourWorld Watson Assistant Node.js demo

This demo lets you communicate with a Watson assistant with Facebook Messenger as front-end. The assistant is restricted to take only text as input, and send text or image output.

Some of the code is taken from the Messenger and Watson Assistant v2 documentation.

## Get Started

1) Clone the project by entering the following to your cmd/terminal: `git clone git@git.eu-gb.bluemix.net:viola.soderlund/hackyourworld-watson-assistant-node.js-demo.git`

2) Then navigate into your git project and enter: `npm install`.

3) Messager cannot call on a localhost adress. Expose your local server to an external URL by using a service like [ngrok][].

4) Add the nessasary authorization keys to the contract files.
    - `webhook_contract.js`
        - verifyToken - verification token for Messanger. You deside its value, then provide it to your Facebook app's Messager product's settings page.
        - pageAccessToken - key to the Messager API. Can be generated under your Messager pruduct's settigns page.
    - `watson_assistant_contract.js`
        - apiKey - key to the Watson Assistant API. Find it on your service's dashbord.
        - url - service endpoint for your Watson Assistant service API.
        - version - the day you created your service's credentials formatted as YYYY-MM-DD. Find it on your service's dashbord under service credentials.
        - assistantId - the identifier for the assistant in question you are communicating with. Find it on your assistant's page under view API details. 

5) Test your application's functionality by submitting `npm test`

6) Chat with your page on Facebook Messager.

For information about Watson Assistant and how to set up your Facebook app, look below.

### IBM Watson Assistant v2

Create an assistant and assign it a skill.

[Visit the documentation][] for information about how to communicate with your API.

### Facebook Messanger integration

Check out this [getting started guide][] for more fun functions to add to this template.

#### Set up your Facebook app

A Facebook app is what links your dedicated facebook page to your node.js app's webhook, and is where you will configure various permissions for your API, generate access tokens, and choose what events are sent to your webhook.

Setup your Facebook app with Facebook's [setup guide][] or follow the guild below.

##### Quick step-by-step

- Create a facebook app on `https://developers.facebook.com/apps/`.
- Under advanced settings, create a page. Note that the page must be of type company/product, of category Application page and named so that it's name contains the name of your Facebook app.
- Under Products (look below the side menu), add Messenger.
- Under Messenger settings
    - Under token generation, generate a page access token.
    - Under webhooks
        - Verify your webhook and add the page subscription events: messages.
        - Subscribe your webhook to your Facebook app's dedicated page.

[ngrok]: https://ngrok.com/
[Visit the documentation]: https://cloud.ibm.com/apidocs/assistant-v2?code=node#authentication
[setup guide]: https://developers.facebook.com/docs/messenger-platform/getting-started/app-setup
[getting started guide]: https://developers.facebook.com/docs/messenger-platform/getting-started/quick-start 
