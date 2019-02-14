# HackYourWorld Watson Assistant Node.js demo

[Expose your local server to an external URL][]

## IBM Watson Assistant v2

[Visit the documentation for more information][]

## Facebook Messanger integration

Check out this [Getting started guide][] for more fun functions to add to this template.

### Setting up your Facebook app

A Facebook app is what links your Facebook Page to your webhook, and is where you will configure various settings for your Messenger bot, generate access tokens, and choose what events are sent to your webhook.

[Facebook for Developers' Facebook app setup guide][]

As long as your webhook URL is dynamic, you'll have to edit your Facebook application's webhook events. 

### Test application functionality

Test your webhook verification by submitting: `curl -X GET "localhost:1337/webhook?hub.verify_token=<YOUR_VERIFY_TOKEN>&hub.challenge=CHALLENGE_ACCEPTED&hub.mode=subscribe"`

Test your webhook events by submitting: `curl -H "Content-Type: application/json" -X POST "localhost:1337/webhook" -d '{"object": "page", "entry": [{"messaging": [{"message": "TEST_MESSAGE"}]}]}'`

[Expose your local server to an external URL]: https://ngrok.com/
[Visit the documentation for more information]: https://cloud.ibm.com/apidocs/assistant-v2?code=node#authentication
[Facebook for Developers' Facebook app setup guide]: https://developers.facebook.com/docs/messenger-platform/getting-started/app-setup
[Getting started guide]: https://developers.facebook.com/docs/messenger-platform/getting-started/quick-start 