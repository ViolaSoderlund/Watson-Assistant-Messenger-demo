const assistantManager = require("../assistant/watson_assistant");

const chai = require("chai");

const expect = chai.expect;

describe("watson assistant", () => {
    it("message analyzation works as expected", () => {
        new Promise((resolve, reject) => {
            assistantManager.openSession()
        }).then(() => {
            new Promise((resolve, reject) => {
                resolve(assistantManager.analyzeMessage("hej"))
            }).then(data => {
                expect(data).to.should.not.equal(undefined);

                assistantManager.closeSession();
            });
        });
    });
});