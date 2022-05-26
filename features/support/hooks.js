const fs = require('fs');
const createTestCafe = require('testcafe');
const testControllerHolder = require('./testControllerHolder');
const {AfterAll, setDefaultTimeout, Before, After, Status} = require('cucumber');
const errorHandling = require('./errorHandling');

let isTestCafeError = false;
let attachScreenshotToReport = null;
let cafeRunner = null;
let n = 0;

function createTestFile() {
    fs.writeFileSync('test.js',
        'import errorHandling from "./features/support/errorHandling.js";\n' +
        'import testControllerHolder from "./features/support/testControllerHolder.js";\n\n' +
        'fixture("fixture")\n' +
        'test\n' +
        '("test", testControllerHolder.capture)')
}

// Refer: https://devexpress.github.io/testcafe/documentation/using-testcafe/programming-interface/runner.html#run
function runTest(iteration) {
    createTestCafe('localhost', 1338 + iteration, 1339 + iteration)
    //createTestCafe('localhost', 1338)
        .then(function (tc) {
            cafeRunner = tc;

            const browsers = process.env.TESTCAFE_BROWSER ? process.env.TESTCAFE_BROWSER : 'chrome';
            const concurrency = process.env.TESTCAFE_CONCURRENCY ? parseInt(process.env.TESTCAFE_CONCURRENCY) : 1;
            const runOptions = {
                skipJsErrors: process.env.TESTCAFE_SKIP_JS_ERRORS === 'true',
                skipUncaughtErrors: process.env.TESTCAFE_SKIP_UNCAUGHT_ERRORS === 'true',
                selectorTimeout: process.env.TESTCAFE_SELECTOR_TIMEOUT ? process.env.TESTCAFE_SELECTOR_TIMEOUT : 10000,
                assertionTimeout: process.env.TESTCAFE_ASSERTION_TIMEOUT ? process.env.TESTCAFE_ASSERTION_TIMEOUT : 10000,
                pageLoadTimeout: process.env.TESTCAFE_PAGE_LOAD_TIMEOUT ? process.env.TESTCAFE_PAGE_LOAD_TIMEOUT : 10000,
                speed: process.env.TESTCAFE_RUN_SPEED ? parseInt(process.env.TESTCAFE_RUN_SPEED) : 1,
                stopOnFirstFail: process.env.TESTCAFE_STOP_ON_1ST_FAIL === 'true'
            };

            const runner = tc.createRunner();
            return runner
                .src('./test.js')
                .screenshots('reports/screenshots/', true)
                .browsers(browsers)
                .concurrency(concurrency)
                .run(runOptions)
                .catch(function (error) {
                    console.error(error);
                });
        })
        .then(function (report) {
            // TODO: Should this be handled? And should we add a catch to this promise?
        });
}

const IGNORE_TAGS = process.env.TESTCAFE_IGNORE_TAGS ? process.env.TESTCAFE_IGNORE_TAGS : '@ignore or @skip_prod';
const GENERIC_TIMEOUT = process.env.TESTCAFE_GENERIC_TIMEOUT ? process.env.TESTCAFE_GENERIC_TIMEOUT : 20000;

function waitFor() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, 3000);
    });
}

setDefaultTimeout(GENERIC_TIMEOUT);

Before(function () {
    runTest(n, this.setBrowser());
    createTestFile();
    n += 2;
    return this.waitForTestController.then(function (testController) {
        return testController.maximizeWindow();
    });
});

// Refer: https://github.com/cucumber/cucumber-js/blob/master/docs/support_files/hooks.md
Before({tags: IGNORE_TAGS}, function () {
    return 'skipped';
});

After(async () => {
    fs.unlinkSync('test.js');
    cafeRunner.close();
    testControllerHolder.free();
    await waitFor();
});

After(async function (testCase) {
    const world = this;
    if (testCase.result.status === Status.FAILED) {
        isTestCafeError = true;
        attachScreenshotToReport = world.attachScreenshotToReport;
        errorHandling.addErrorToController();
        await errorHandling.ifErrorTakeScreenshot(testController)
    }
});

AfterAll(function () {
    let intervalId = null;

    function waitForTestCafe() {
        intervalId = setInterval(checkLastResponse, 500);
    }

    function checkLastResponse() {
        if (testController.testRun.lastDriverStatusResponse === 'test-done-confirmation') {
            cafeRunner.close();
            process.exit();
            clearInterval(intervalId);
        }
    }

    waitForTestCafe();
});

const getIsTestCafeError = function () {
    return isTestCafeError;
};

const getAttachScreenshotToReport = function (path) {
    return attachScreenshotToReport(path);
};

exports.getIsTestCafeError = getIsTestCafeError;
exports.getAttachScreenshotToReport = getAttachScreenshotToReport;
