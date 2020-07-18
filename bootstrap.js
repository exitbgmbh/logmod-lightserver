const { checkRoot } = require('./helper')
if (!checkRoot()) {
    console.error('application needs to be started as root')
    process.exit(99);
}

const app = require('./application');
app.run();