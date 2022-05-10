const {Selector} = require('testcafe');
const { Given, When, Then } = require('cucumber');
const ClientFunction = require('testcafe').ClientFunction;

var varName = 'John Matt'
var varEmail = 'john.matt'
var varMessage = 'This is a sample message'


module.exports = {
    getContactInformations: function()
    {
        for (i = 1; i <= 5; i++)   
        { 
            return varName + i, varEmail + i + '@gmail.com', varMessage
        }
    },
}