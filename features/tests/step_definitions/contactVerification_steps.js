
const contactVerification = require('../pages/contactVerification_pageObjects.js');
const myFunctions = require('../commonFunctions/functions.js');
const {Given, When, Then} = require('cucumber');
const { Selector } = require('testcafe');
let i;

Given('User navigates to the home page', async function () {
    await testController.navigateTo('https://jupiter.cloud.planittesting.com/');
});

When('User click on Contact menu', async function () {
    await testController.click(contactVerification.elements.menuContact());
});

Then('User will be redirected to the Contact screen', async function () {
    const welcomeMessageElement = contactVerification.elements.contactScreen();
    await testController.expect(welcomeMessageElement.innerText).contains('welcome');
});

When('I click Submit button', async function () {
    await testController.click(contactVerification.elements.btnSubmit());
});

Then('I see error messages with the mandatory fields Forename, Email and Message', async function () {
    await testController
    .click(contactVerification.elements.btnSubmit())    
    await testController
        .expect(contactVerification.elements.errMsgForename().visible).ok()
        .expect(contactVerification.elements.errMsgEmail().visible).ok()
        .expect(contactVerification.elements.errMsgMessage().visible).ok()
        .wait(2000)
});
When('I enter the mandatory fields information {string},{string}, and {string} for verification', async function (UserName, UserEmail, UserMessage) {
    await testController
        .typeText(contactVerification.elements.tboxForename(), UserName)
        .typeText(contactVerification.elements.tboxEmail(), UserEmail)
        .typeText(contactVerification.elements.tboxMessage(), UserMessage)
    
});
Then('I will see the errors are gone', async function () {
    await testController
        .expect(contactVerification.elements.errMsgForename().exists).notOk()
        .expect(contactVerification.elements.errMsgEmail().exists).notOk()
        .expect(contactVerification.elements.errMsgMessage().exists).notOk()
});



