const fs = require('fs');
const createTestCafe = require('testcafe');
const testControllerHolder = require('./testControllerHolder');
const {AfterAll, setDefaultTimeout, Before,beforeEach, After, Status, BeforeAll} = require('cucumber');
const timeout = 20000;
let cafeRunner = null;
let n = 0;


function createTestFile() {
   fs.writeFileSync('cucumbertest.js',
        'import testControllerHolder from "./features/support/testControllerHolder.js";\n\n' +
        'fixture("cucumberfixture")\n' +
        'test\n' +
        '("test", testControllerHolder.capture)')
}

// Create a runner function with configurations like src, screenshots, browsers.
function runTest(iteration, browser) {
    createTestCafe('localhost', 1338 + iteration, 1339 + iteration)
        .then(function (tc) {
            cafeRunner = tc;
            const runner = tc.createRunner();
            return runner
                .src('./cucumbertest.js')
                .screenshots('reports/screenshots/', true)
                .browsers(browser)
                .run();
        });
}

function waitFor() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, 3000);
    });
}

setDefaultTimeout(timeout);

Before(function() {
    runTest(n, 'chrome');
    createTestFile();
    n += 2;
    return this.waitForTestController.then(function(testController) {
        return testController.maximizeWindow();
    });
});

//After(function()  {
After(async () => {
    fs.unlinkSync('cucumbertest.js');
    cafeRunner.close(); //new
    testControllerHolder.free();
    await waitFor(); //new
});



AfterAll(function() {
    console.log('------------After All');
    let intervalId = null;
    function waitForTestCafe() {
        intervalId = setInterval(checkLastResponse, 500);
    }
    function checkLastResponse() {
        if (testController.testRun.lastDriverStatusResponse === 'test-done-confirmation') {
            cafeRunner.close();
            process.exit();
        }
    }
    waitForTestCafe();
});