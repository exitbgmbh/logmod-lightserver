const EventEmitter = require('events');
const eventConst = require('./../event');
const configCtrl = require('./config');

class SocketEventEmitter extends EventEmitter {
    handleSocketEvent(socketMessage) {
        switch(socketMessage.type) {
            case eventConst.EVENT_TYPE_PICK_BOX:
                this.handlePickBoxEvent(socketMessage.event, socketMessage.data);
                break;

            default:
                break;
        }
    }

    handlePickBoxEvent(event, eventData) {
        switch (event) {
            case eventConst.EVENT_MESSAGE_PICK_BOX_PICK:
                const lightController = require('./../controller/light');
                const boxConfig = configCtrl.getBoxLightCollection(eventData.pickBoxIdent);
                if (boxConfig) {
                    lightController.blink(boxConfig.lightIdCollection[0], boxConfig.boxSignalColor);
                }
                break;

            default:
                break;
        }
    }

}

module.exports = new SocketEventEmitter();