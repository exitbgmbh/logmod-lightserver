const isRoot = process.env.NODE_ENV === 'dev' ? () => {return true} : require('is-root');
if (!isRoot()) {
    console.log('must run as root');
    process.exit(99);
}

const AutoUpdater = require('auto-updater');
const runServer = require('./server');
const autoupdater = new AutoUpdater({
    pathToJson: '',
    autoupdate: true,
    checkgit: false,
    jsonhost: 'raw.githubusercontent.com',
    contenthost: 'codeload.github.com',
    progressDebounce: 0,
    devmode: process.env.NODE_ENV === 'dev'
});

// State the events
autoupdater.on('git-clone', function() {
    console.log("You have a clone of the repository. Use 'git pull' to be up-to-date");
    runServer(false);
});
autoupdater.on('check.up-to-date', function(v) {
    console.info("You have the latest version: " + v);
});
autoupdater.on('check.out-dated', function(v_old, v) {
    console.warn("Your version is outdated. " + v_old + " of " + v);
    autoupdater.fire('download-update');
});
autoupdater.on('update.downloaded', function() {
    console.log("Update downloaded and ready for install");
    autoupdater.fire('extract');
});
autoupdater.on('update.not-installed', function() {
    console.log("The Update was already in your folder! It's read for install");
    autoupdater.fire('extract');
});
autoupdater.on('update.extracted', function() {
    console.log("Update extracted successfully!");
    runServer(true);
});
autoupdater.on('download.start', function(name) {
    console.log("Starting downloading: " + name);
});
autoupdater.on('download.progress', function(name, perc) {
    process.stdout.write("Downloading " + perc + "% \033[0G");
});
autoupdater.on('error', function(name, e) {
    console.error(name, e);
});

autoupdater.fire('check');