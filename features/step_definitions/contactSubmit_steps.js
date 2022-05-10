
const contactPage = require('../pages/contactSubmit_pageObjects.js');
const homePage = require('../pages/home_pageObjects.js');
const {Given, When, Then} = require('cucumber');
const { Selector } = require('testcafe');

Then('I see the Thanks message', async function () {
    const ThanksMessageElement = contactPage.elements.msgThankYou();
    await testController
        .wait(30000)
        .expect(ThanksMessageElement.innerText,{setTimeout:10000}).contains('Thanks')
});


