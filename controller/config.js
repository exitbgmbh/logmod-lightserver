const settingsFileName = './log-light.cfg.json';
const colors = require('./../color');
const fs = require('fs');

const defaultConfig = {
    blisstributeRestUrl: null,
    blisstributeRestClient: null,
    blisstributeRestUser: null,
    blisstributeRestPassword: null,
    numberOfLights: 1,
    blinkingTimeout: 125,
    maxBrightness: 255,
    defaultBrightness: 125,
    blinkingCount: 10,
    defaultBoxSignalColor: colors.COLOR_EXITB,
    boxConfiguration: []
};

class ConfigController {
    resetConfig() {
        if (!fs.existsSync(settingsFileName)) {
            return;
        }

        this.config = defaultConfig;
        this.saveConfig();
    }

    constructor() {
        console.log('configCtrl::constructor::started');
        if (!fs.existsSync(settingsFileName)) {
            console.log('configCtrl::constructor::no config found, setting default');
            this.config = defaultConfig;
            this.saveConfig();
        }
    
        console.log('configCtrl::constructor::file found, proceed loading');
        this.config = JSON.parse(fs.readFileSync(settingsFileName));
        console.log('configCtrl::constructor::config loaded', JSON.stringify(this.config));
    }

    saveConfig() {
        if (!this.config) {
            throw 'configuration not initialized';
        }

        fs.writeFileSync(settingsFileName, JSON.stringify(this.config, null, 2));
    }

    getConfig() {
        return this.config;
    }

    setConfig(config) {
        this.config = config;
    }
    
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

    getNumberOfLights() {
        return this.config.numberOfLights;
    }

    setNumberOfLights(numberOfLights) {
        this.config.numberOfLights = parseInt(numberOfLights);
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

    getBlinkingCount() {
        return this.config.blinkingCount;
    }

    setBlinkingCount(blinkingCount) {
        this.config.blinkingCount = blinkingCount;
    }

    setDefaultBoxSignalColor(defaultBoxSignalColor) {
        this.config.defaultBoxSignalColor = defaultBoxSignalColor;
    }

    getDefaultBoxSignalColor() {
        return this.config.defaultBoxSignalColor;
    }

    isBlisstributeConfigured() {
        return this.getBlisstributeRestUrl() &&
            this.getBlisstributeRestClient() &&
            this.getBlisstributeRestPassword() &&
            this.getBlisstributeRestUser();
    }
}

module.exports = new ConfigController();