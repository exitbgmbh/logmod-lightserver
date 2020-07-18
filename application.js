const AutoUpdater = require('auto-updater');

class App {
    setupAutoUpdate() {
        this.autoUpdater = new AutoUpdater({
            autoupdate: false,
            checkgit: false,
            jsonhost: 'raw.githubusercontent.com',
            contenthost: 'codeload.github.com',
            progressDebounce: 0,
            devmode: process.env.NODE_ENV === 'dev'
        });
    
        this.autoUpdater.on('check.up-to-date', function(v) {
            console.info("You have the latest version: " + v);
        });
    
        this.autoUpdater.on('check.out-dated', function(oldVersion, newVersion) {
            console.warn("Your version is outdated. " + oldVersion + " of " + newVersion);
        });
    
        this.autoUpdater.fire('check');
        setInterval(() => {
            this.autoUpdater.fire('check');
        }, 600 * 1000);
    }
    
    constructor() {
        this.setupAutoUpdate();
        
    }

    run() {
    
    }
}

module.exports = new App();