const EventEmitter = require('events');
const eventConst = require('./../event');

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
                this.emit(event, eventData.pickBoxIdent);
                break;

            default:
                break;
        }
    }

}

const socketEventEmitter = new SocketEventEmitter();
module.exports = socketEventEmitter;