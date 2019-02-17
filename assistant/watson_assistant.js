const AssistantV2 = require('watson-developer-cloud/assistant/v2');

const CREDENTIALS = require('./watson_assistant_contract');

let assistant;

const session = {
    id: undefined
};

// Initialize the assistant api
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

// Handle errors thrown by the assistant
function handle_error(err) {
    if (err) {
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

// Open a new conversation session
function open_session() {
    check_init();

    if (!session.id) {
        return new Promise((resolve, reject) => {
            assistant.createSession({ assistant_id: CREDENTIALS.assistantId }, function(err, response) {
                if (!handle_error(err)) {
                    if (!session.id) {
                        // Set the new session id
                        session.id = response.session_id;
                    }

                    console.log("\nSession has been successfully created.");
                    console.log("- Session ID: " + response.session_id);
                    console.log("");

                    resolve(true);
                }
                else {
                    console.log("\nUnsuccessful in opening a new session.\n");

                    reject(err);

                    resolve(false);
                }

                return;
            });
        });
    }
}

// Close the conversation session
function close_session() {
    check_init();

    if (session.id) {
        assistant.deleteSession({
                assistant_id: CREDENTIALS.assistantId,
                session_id: session.id,
            }, 
            function(err, response) {
                if (!handle_error(err)) {
                    console.log("\nSession has been successfully created.");
                    console.log("- Session ID: " + response.session_id);
                    console.log("");

                    // Clear the session id
                    session = undefined;
                }
                else {
                    console.log("\nUnsuccessful in closing the session: " + session + "\n");
                }
            }
        );
    }
    else {
        console.log("WARNING: A session has not been open.");
    }
}

// Send a message to the assistant and get a response
function analyze_message(message) {
    check_init();

    if (session.id) { 
        return new Promise(function(resolve, reject) { 
            assistant.message({
                    assistant_id: CREDENTIALS.assistantId,
                    session_id: session.id,
                    input: {
                        'message_type': 'text',
                        'text': message
                    }
                }, 
                function(err, response) {
                    if (!handle_error(err)) {
                        console.log("\nMessage has been successfully analyzed.");
                        console.log("- Response: " + response.output.generic[0].response_type);
                        console.log("");

                        let data;

                        // Wrap text response
                        if (response.output.generic[0].response_type == 'text') {
                            data = {
                                type: 'text',
                                text: response.output.generic[0].text
                            }
                        }
                        // Wrap image response
                        else if (response.output.generic[0].response_type == 'image') {
                            data = {
                                type: 'image',
                                title: response.output.generic[0].title,
                                description: response.output.generic[0].description,
                                source: response.output.generic[0].source
                            }
                        }

                        resolve({
                            type: response.output.generic[0].response_type,
                            data: data
                        });
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