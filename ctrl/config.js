const constants = require('../const');
const configFile = './config.json'
const defaultConfig = {
    connection: {
        restUrl: '',
        restClientCode: '',
        restApiKey: ''
    },
    
    light: {
        defaults: {
            brightness: constants.brightness.DEFAULT,
            color: constants.colors.EXITB
        },
        mapping: [
            {
                index: 0,
                identifier: '0001',
                blinkCount: 10,
                blinkTimeout: 100,
                type: constants.lights.TYPE_SCAN_IN
            }
        ]
    }
};

class Config {
    constructor() {
        this.lights = [];
        this.timeoutCollection = [];
    
        this.numberOfLights = 1;
    }
    
    setConfig(config = {}) {
        
        //ws281x.init()
    }
    
    /**
     * clears the whole strip
     */
    clear() {
        this.clearTimeouts();
        for (let i = 0; i < this.numberOfLights; i++) {
            this.lights[i] = colorConst.OFF;
        }
        
        this._render();
    }
    
    /**
     * delete all cached timeouts
     */
    clearTimeouts() {
        this.timeoutCollection.forEach((n) => {
            clearTimeout(n);
        })
    }
    
    systemStartupSuccess() {
    
    }
    
    systemStartupFailed() {
    
    }
    
    systemUpdateRequired() {
        this.clear();
        this.lights[STATUS_LED] = colorConst.EXITB;
        this._render();
    }

    /**
     * renders the current light configuration
     *
     * @private
     */
    _render() {
        console.log('rendering statusLED', this.lights);
        let ws281Lights = new Uint32Array(this.lights);
        ws281x.render(ws281Lights);
    }
}

module.exports = new Light();