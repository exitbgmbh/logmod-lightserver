module.exports = {
    colors: {
        OFF: parseInt('0x000000'),
        EXITB: parseInt('0x09cbe9'),
        RED: parseInt('0xff0000'),
        GREEN: parseInt('0x00ff00'),
        BLUE: parseInt('0x0000ff'),
        WHITE: parseInt('0xffffff'),
    },
    
    brightness: {
        DEFAULT: 125,
        MIN: 10,
        MAX: 255,
    },
    
    blink: {
        TIMEOUT_DEFAULT: 125,
        COUNT_DEFAULT: 5
    },
    
    lights: {
        TYPE_STATUS: 'status',
        TYPE_SCAN_IN: 'scanIn',
        TYPE_SHIP_OUT: 'shipOut'
    }
};