require("chai").should();

module.exports = function(test_title, sub_tests) {
    describe(test_title + " CANARY TEST:", () => {
        it("Infrastructure is working as expected.", () => {
            true.should.be.equal(true);
        });

        it("Ready to run sub-tests.", () => {
            sub_tests.should.be.a('Function');

            sub_tests.should.have.lengthOf(0);
        })

        sub_tests();
    });    
}