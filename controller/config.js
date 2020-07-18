const settingsFileName = './log-light.cfg.json';
const {colors, brightness, blink, lights} = require('./../const');
const fs = require('fs');

const defaultConfig = {
    blisstributeRestUrl: null,
    blisstributeRestClient: null,
    blisstributeRestUser: null,
    blisstributeRestPassword: null,
    
    blinkTimeout: blink.TIMEOUT_DEFAULT,
    defaultBrightness: brightness.DEFAULT,
    blinkCount: blink.COUNT_DEFAULT,
    defaultBoxSignalColor: colors.EXITB,
    
    lightConfiguration: [{
        index: 0,
        type: lights.TYPE_STATUS,
        identifier: 'STATUS',
        color: colors.RED,
        brightness: brightness.MAX
    }]
};

class ConfigController {
    constructor() {
        console.log('configCtrl::ctor::start');
        if (!fs.existsSync(settingsFileName)) {
            console.log('configCtrl::ctor::no config found');
            this.config = defaultConfig;
            this.saveConfig();
        }
    
        console.log('configCtrl::ctor::config found');
        this.config = JSON.parse(fs.readFileSync(settingsFileName));
        console.log('configCtrl::ctor::config loaded', JSON.stringify(this.config));
    }
    
    /** GETTER / SETTER */
    
    getBlisstributeRestUrl() {
        return this.config.blisstributeRestUrl;
    }

    setBlisstributeRestUrl(blisstributeRestUrl) {
        this.config.blisstributeRestUrl = blisstributeRestUrl;
    }
    
    getBlisstributeRestClient() {
        return this.config.blisstributeRestClient;
    }

    setBlisstributeRestClient(blisstributeRestClient) {
        this.config.blisstributeRestClient = blisstributeRestClient;
    }
    
    getBlisstributeRestUser() {
        return this.config.blisstributeRestUser;
    }

    setBlisstributeRestUser(blisstributeRestUser) {
        this.config.blisstributeRestUser = blisstributeRestUser;
    }
    
    getBlisstributeRestPassword() {
        return this.config.blisstributeRestPassword;
    }

    setBlisstributeRestPassword(blisstributeRestPassword) {
        this.config.blisstributeRestPassword = blisstributeRestPassword;
    }

    getBlinkingTimeout() {
        return this.config.blinkingTimeout;
    }

    setBlinkingTimeout(blinkTimeout) {
        this.config.blinkingTimeout = parseInt(blinkTimeout);
    }

    getMaxBrightness() {
        return this.config.maxBrightness;
    }

    setMaxBrightness(maxBrightness) {
        this.config.maxBrightness = maxBrightness;
    }

    getDefaultBrightness() {
        return this.config.defaultBrightness;
    }

    setDefaultBrightness(defaultBrightness) {
        this.config.defaultBrightness = defaultBrightness;
    }
    
    getBlinkingCount() {
        return this.config.blinkingCount;
    }
    
    setBlinkingCount(blinkingCount) {
        this.config.blinkingCount = blinkingCount;
    }
    
    getNumberOfLights() {
        return this.config.lightConfiguration.length;
    }
    
    /** EO GETTER / SETTER */

    isBlisstributeConfigured() {
        return this.getBlisstributeRestUrl() &&
            this.getBlisstributeRestClient() &&
            this.getBlisstributeRestPassword() &&
            this.getBlisstributeRestUser();
    }
    
    isSystemConfigured() {
        return this.config.lightConfiguration.length > 1;
    }
    
    isFullyConfigured() {
        return this.isBlisstributeConfigured() &&
            this.isSystemConfigured();
    }
    
    resetConfig() {
        if (!fs.existsSync(settingsFileName)) {
            return;
        }
        
        this.config = defaultConfig;
        this.saveConfig();
    }
    
    saveConfig() {
        if (!this.config) {
            throw 'configuration not initialized';
        }
        
        fs.writeFileSync(settingsFileName, JSON.stringify(this.config, null, 2), {mode: 0o777});
    }
    
    getConfig() {
        return this.config;
    }
    
    getStatusLight() {
        this.config.lightConfiguration.forEach((light) => {
        
        })
    }
    
    getBoxColor(boxIdent) {
        let boxConfig = this._getBoxConfigurationForIdent(boxIdent);
        if (!boxConfig) {
            return this.config.defaultBoxSignalColor;
        }

        return boxConfig.boxSignalColor;
    }

    getBoxLightCollection(boxIdent) {
        let boxConfig = this._getBoxConfigurationForIdent(boxIdent);
        if (!boxConfig) {
            return [];
        }

        return boxConfig.lightIdCollection;
    }

    _getBoxConfigurationForIdent(boxIdent) {
        let result = null;
        this.config.boxConfiguration.forEach(function(boxConfig) {
            if (boxConfig.boxIdent === boxIdent) {
                result = boxConfig;
                return false;
            }
        });

        return result;
    }
}

module.exports = new ConfigController();