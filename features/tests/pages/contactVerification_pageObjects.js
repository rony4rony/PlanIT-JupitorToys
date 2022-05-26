const {Selector} = require('testcafe');

/*
Create and export a module with name "elements". This module contains functions.
Each function is returning a Selector for a particular web element and bind to testController.
This module can be imported and called from Step Definitions to access the web elements.
*/

exports.elements = {
    menuContact: function() {
        return Selector('li#nav-contact > a').with({ boundTestRun: testController });
    },
    contactScreen: function() {
        return Selector('div#header-message strong').with({ boundTestRun: testController });
    },
    btnSubmit: function() {
        return Selector('form[name="form"] a').with({ boundTestRun: testController });
    },
    errMsgForename: function() {
        return Selector('span#forename-err').with({ boundTestRun: testController });
    },
    errMsgEmail: function() {
        return Selector('span#email-err').with({ boundTestRun: testController });
    },
    errMsgMessage: function() {
        return Selector('span#message-err').with({ boundTestRun: testController });
    },

    tboxForename: function() {
        return Selector('input#forename').with({ boundTestRun: testController });
    },
    tboxEmail: function() {
        return Selector('input#email').with({ boundTestRun: testController });
    },
    tboxMessage: function() {
        return Selector('textarea#message').with({ boundTestRun: testController });
    },

    //test case 2
    btnBack: function() {
        return Selector('div.container-fluid > div > a').with({ boundTestRun: testController });
    },

    msgThankYou: function() {
        return Selector('div.container-fluid > div > div').with({ boundTestRun: testController });
    },
}