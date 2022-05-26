
const contactSubmit = require('../pages/contactSubmit_pageObjects.js');
const contactVerification = require('../pages/contactVerification_pageObjects.js');
const {Given, When, Then} = require('cucumber');
const { Selector } = require('testcafe');

When('I enter the mandatory fields information {string},{string}, and {string} for submission', async function (UserName, UserEmail, UserMessage) {
    await testController
        .typeText(contactVerification.elements.tboxForename(), UserName)
        .typeText(contactVerification.elements.tboxEmail(), UserEmail)
        .typeText(contactVerification.elements.tboxMessage(), UserMessage)
});

Then('I see the Thanks message', async function () {
    const ThanksMessageElement = contactSubmit.elements.msgThankYou();
    await testController
        .wait(15000)
        .expect(ThanksMessageElement.innerText,{setTimeout:10000}).contains('Thanks')
});


