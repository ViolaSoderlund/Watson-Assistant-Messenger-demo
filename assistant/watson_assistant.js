const AssistantV2 = require('watson-developer-cloud/assistant/v2');

const CREDENTIALS = require('./watson_assistant_contract');

let assistant;

let session;

function check_init() {
    if (!assistant) {
        // Create a new assistant
        assistant = new AssistantV2({
            version: CREDENTIALS.version,
            iam_apikey: CREDENTIALS.apiKey,
            url: CREDENTIALS.url
        });
    }
}

function handle_error(err) {
    if (err) {
        // The error will be the first argument of the callback
        if (err.code == 404) {
      
            console.log("ERROR: Requested path does not exist.");
        } 
        else if (err.code == 413) {

            console.log("ERROR: Message's too large!");
        } 
        else {
            console.log('UNEXPECTED ERROR: ', err.code);

            console.log('ERROR:', err);
        }

        return true;
    }

    return false;
}

function open_session() {
    check_init();

    if (!session) {
        assistant.createSession({ assistant_id: CREDENTIALS.assistantId }, function(err, response) {
            if (!handle_error(err)) {
                session = response.session_id;

                console.log("\nSession has been successfully created.");
                console.log("- Session ID: " + response.session_id);
                console.log("");
            }
            else {
                console.log("\nUnsuccessful in opening a new session.\n");
            }
        });
    }
}

function close_session() {
    check_init();

    if (session) {
        assistant.deleteSession({
                assistant_id: CREDENTIALS.assistantId,
                session_id: session,
            }, 
            function(err, response) {
                if (!handle_error(err)) {
                    console.log("\nSession has been successfully created.");
                    console.log("- Session ID: " + response.session_id);
                    console.log("");

                    session = undefined;
                }
                else {
                    console.log("\nUnsuccessful in closing the session: " + session + "\n");
                }
            }
        );
    }
}

function analyze_message(message) {
    check_init();

    if (session) { 
        return new Promise(function(resolve, reject) { 
            assistant.message({
                    assistant_id: CREDENTIALS.assistantId,
                    session_id: session,
                    input: {
                        'message_type': 'text',
                        'text': message
                    }
                }, 
                function(err, response) {
                    if (!handle_error(err)) {
                        console.log("\nMessage has been successfully analyzed.");
                        console.log("- Response: " + response.output.generic[0].text);
                        console.log("");

                        resolve(response.output.generic[0].text);
                    }
                    else {
                        console.log("\nAssistant failed to analyze message.\n");
                    }
                }
            );
        });
    }
    else {
        console.log("ERROR: A session must be opened before the assistant can analyze messages.");
    }
}

module.exports = {
    openSession: open_session,
    closeSession: close_session,
    analyzeMessage: function(message) {
        return analyze_message(message);
    }
};