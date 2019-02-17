//#region IMPORTS

const runTest = require("./test_frame");

const assistantManager = require("../assistant/watson_assistant");

const chai = require("chai");

chai.use(require('chai-as-promised'));

//#endregion

const expect = chai.expect;

chai.should();

// TEST FOR THE WATSON ASSISTANT API
runTest("watson assistant", () => {
    describe("watson assistant function", () => {
        // MESSAGE ANALYZATION TEST
        it("message analyzation works as expected", () => {
            // OPEN SESSION
            return assistantManager.openSession().then(function(result) {
                result.should.be.equal(true);

                // ANALYZE MESSAGE
                return assistantManager.analyzeMessage("hej").then(function(data) {
                    expect(data).to.have.property("data");

                    expect(data.data).to.have.property("type");;
                    
                    // CLOSE SESSION
                    assistantManager.closeSession();
                });
            });
        });
    });
});