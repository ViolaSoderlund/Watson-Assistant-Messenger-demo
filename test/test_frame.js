require("chai").should();

module.exports = function(test_title, sub_tests) {
    // TEST SUITE FRAME
    describe(test_title + " CANARY TEST:", () => {
        // TEST FRAMEWORK MODULES' FUNCTIONALITY
        it("Infrastructure is working as expected.", () => {
            true.should.be.equal(true);
        });

        // ERROR CHECK: TESTS HANDLER
        it("Ready to run sub-tests.", () => {
            sub_tests.should.be.a('Function');

            sub_tests.should.have.lengthOf(0);
        })

        // RUN TESTS
        sub_tests();
    });    
}