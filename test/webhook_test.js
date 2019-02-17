//#region IMPORTS

const runTest = require('./test_frame');

const chai = require("chai");

const server = require("../index");

const request = require("request");

const WEBHOOK_CREDENTIALS = require("../messenger/webhook_contract");

//#endregion

chai.use(require("chai-http"));

chai.should();

// TEST FOR THE MESSENGER API WEBHOOKS
runTest("webhook", () => {
    describe("webhook functions", () => {
        // VERIFICATION TEST
        it("verification works as expected", () => {
            const CHALLENGE = "CHALLENGE_ACCEPTED";

            chai.request(server).get(`/webhook?hub.verify_token=${ WEBHOOK_CREDENTIALS.verifyToken }&hub.challenge=${ CHALLENGE }&hub.mode=subscribe`).end((err, res)=>{
                res.should.have.status(200);
            });
        });

        // EVENT TEST
        it("events works as expected", () => {
            request({
                url: "https://localhost:1337/webhook",
                method: "POST",
                json: {
                    "object": "page", 
                    "entry": [{
                        "messaging": [{
                            "message": "TEST_MESSAGE"
                        }]
                    }]
                }
            }, (err, res, body) => {
                res.statusCode.should.be.equal(200);
            });
        });
    });
});