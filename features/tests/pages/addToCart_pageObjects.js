const {Selector} = require('testcafe');

/*
Create and export a module with name "elements". This module contains functions.
Each function is returning a Selector for a particular web element and bind to testController.
This module can be imported and called from Step Definitions to access the web elements.
*/

exports.elements = {
    btnStartShopping: function() {
        return Selector('p:nth-child(3) > a').with({ boundTestRun: testController });
    },

    itemStuffedFrog: function() {
        return Selector('li#product-2 a').with({ boundTestRun: testController });
    },
    itemStuffedFrogPrice: function() {
        return Selector('li#product-2 span').with({ boundTestRun: testController });
    },
    itemFluffyBunny: function() {
        return Selector('li#product-4 a').with({ boundTestRun: testController });
    },
    itemFluffyBunnyPrice: function() {
        return Selector('li#product-4 span').with({ boundTestRun: testController });
    },
    itemValentineBear: function() {
        return Selector('li#product-7 a').with({ boundTestRun: testController });
    },
    itemValentineBearPrice: function() {
        return Selector('li#product-7 span').with({ boundTestRun: testController });
    },

    linkCart: function() {
        return Selector('li#nav-cart span').with({ boundTestRun: testController });
    },

    tableCart: function(row, col) {
        return Selector('form[name="form"] tbody > tr:nth-child('+ row + ') > td:nth-child('+ col + ')').with({ boundTestRun: testController });
    },
    tableCartProductTD: function(rowID) {
        return Selector('form[name="form"] tbody > tr:nth-child('+ rowID + ') > td:nth-child(1)').with({ boundTestRun: testController });
    },
    lblTotalPrice: function() {
        return Selector('form[name="form"] strong').with({ boundTestRun: testController });
    },
}