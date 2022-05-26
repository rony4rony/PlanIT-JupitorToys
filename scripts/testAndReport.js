const exec = require('child_process').exec;

const tags = process.argv.slice(2);
let testCommand = 'npm run tests';
if (tags.length) {
    testCommand += ` -- ${tags.join(' ')}`;
} else {
    testCommand += ` -- ${process.env.TESTCAFE_DEFAULT_TAG ? process.env.TESTCAFE_DEFAULT_TAG : '@smokeTest'}`;
}

//console.log(testCommand);

const reporter = (error, stdout, stderr) => {
    console.log(stdout);
    exec("npm run reports");
};

exec(testCommand, reporter);
