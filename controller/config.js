const settingsFileName = './log-light.cfg.json';
const colors = require('./../color');
const fs = require('fs');

const defaultConfig = {
    blisstributeRestUrl: process.env.blisstributeRestUrl || null,
    blisstributeRestClient: process.env.blisstributeRestClient || null,
    blisstributeRestUser: process.env.blisstributeRestUser || null,
    blisstributeRestPassword: process.env.blisstributeRestPassword || null,
    numberOfLights: 10,
    blinkingTimeout: 125,
    maxBrightness: 255,
    defaultBrightness: 125,
    blinkingCount: 10,
    defaultBoxSignalColor: colors.COLOR_EXITB,
    boxConfiguration: [{
        boxIdent: '0001',
        boxSignalColor: colors.COLOR_EXITB,
        lightIdCollection: [0, 1, 2, 3]
    }]
};

class ConfigController {
    resetConfig() {
        if (!fs.existsSync(settingsFileName)) {
            return;
        }

        this.config = defaultConfig;
        this.saveConfig();
    }

    loadConfig() {
        console.log('configCtrl::loadConfig::start');
        if (!fs.existsSync(settingsFileName)) {
            console.log('configCtrl::loadConfig::no config found');
            this.config = defaultConfig;
            this.saveConfig();
        }

        console.log('configCtrl::loadConfig::config found');
        this.config = JSON.parse(fs.readFileSync(settingsFileName));
        console.log('configCtrl::loadConfig::config loaded', JSON.stringify(this.config));
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
        console.log('got box config', boxConfig);
        if (!boxConfig || boxConfig.length === 0) {
            return false;
        }

        return boxConfig[0];
    }

    _getBoxConfigurationForIdent(boxIdent) {
        return this.config.boxConfiguration.filter(function(boxConfig) {
            console.log(boxConfig, boxIdent);
            return boxConfig.boxIdent === boxIdent;
        })
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

const configCtrl = new ConfigController();
module.exports = configCtrl;