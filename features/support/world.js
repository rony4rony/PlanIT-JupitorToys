const {setWorldConstructor} = require('cucumber');
const testControllerHolder = require('./testControllerHolder');
const base64Img = require('base64-img');

function CustomWorld({attach, parameters}) {
    this.waitForTestController = testControllerHolder
        .get()
        .then( (tc) => {
            // TODO: Really not a fan of just using the controller as a global like this. Ideally we'd refactor
            // this into a function that could be called when we need it instead of just awaiting the global.
            return testController = tc;
        });


    this.setBrowser = function () {
        return parameters.browser ? parameters.browser : 'chrome';
    };

    this.attachScreenshotToReport = function (pathToScreenshot) {
        const imgInBase64 = base64Img.base64Sync(pathToScreenshot);
        const imageConvertForCuc = imgInBase64.substring(imgInBase64.indexOf(',') + 1);
        return attach(imageConvertForCuc, 'image/png');
    };
}

setWorldConstructor(CustomWorld);
