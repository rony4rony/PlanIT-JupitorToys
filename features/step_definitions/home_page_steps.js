
const homePage = require('../pages/home_pageObjects.js');
const {Given, When, Then} = require('cucumber');
const { Selector } = require('testcafe');

Given('User navigates to the home page', async function () {
    console.log('-----------------------------------------------------------2nd time')
    await testController.navigateTo('https://jupiter.cloud.planittesting.com/');
});

When('User click on Contact menu', async function () {
    await testController.click(homePage.elements.menuContact());
});

Then('User will be redirected to the Contact screen', async function () {
    const welcomeMessageElement = homePage.elements.contactScreen();
    await testController.expect(welcomeMessageElement.innerText).contains('welcome');
});

When('I click Submit button', async function () {
    await testController.click(homePage.elements.btnSubmit());
});

Then('I see error messages with the mandatory fields Forename, Email and Message', async function () {
    await testController
    .click(homePage.elements.btnSubmit())
    .wait(500)
    await testController
        .expect(homePage.elements.errMsgForename().visible).ok()
        .expect(homePage.elements.errMsgEmail().visible).ok()
        .expect(homePage.elements.errMsgMessage().visible).ok()
});
When('I enter the mandatory fields information', async function () {
    await testController
        .typeText(homePage.elements.tboxForename(), 'John Matt')
        .typeText(homePage.elements.tboxEmail(), 'john.matt@gmail.com')
        .typeText(homePage.elements.tboxMessage(), 'This is a sample message')
});
Then('I will see the errors are gone', async function () {
    await testController
        .expect(homePage.elements.errMsgForename().exists).notOk()
        .expect(homePage.elements.errMsgEmail().exists).notOk()
        .expect(homePage.elements.errMsgMessage().exists).notOk()
});

/*
// Test case 2

When('I enter the mandatory fields information 5 times', async function () {
    await testController
        .click(homePage.elements.btnBack())
        .wait(1000)
        .typeText(homePage.elements.tboxForename(), 'John Matt')
        .typeText(homePage.elements.tboxEmail(), 'john.matt@gmail.com')
        .typeText(homePage.elements.tboxMessage(), 'This is a sample message')
});

Then('I see the Thanks message', async function () {
    const ThanksMessageElement = contactPage.elements.msgThankYou();
    await testController
        .wait(5000)
        .expect(ThanksMessageElement.innerText).contains('Thanks')
});
*/

