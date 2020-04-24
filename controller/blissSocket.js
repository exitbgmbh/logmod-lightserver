const configCtrl = require('./config');
const axios = require('axios/index');
const WebSocket = require('ws');
const lightCtrl = require('./light');
const eventCtrl = require('./event');

const STATE_INITIALIZE = 0,
    STATE_CONNECTED = 10,
    STATE_DISCONNECTED = 20,
    STATE_AUTHENTICATION_FAILED=99;

class BlissSocketController {
    constructor() {
        this.state = STATE_INITIALIZE;
    }

    static handleSocketMessage(message) {
        eventCtrl.handleSocketEvent(JSON.parse(message.data));
    }

    reconnect() {
        this.disconnect();
        this.connect();
    }

    disconnect() {
        if (this.webSocket && this.webSocket.readyState === 1) {
            this.webSocket.close(0, null);
        }

        this.webSocket = null;
        this.state = STATE_DISCONNECTED;
    }

    handleSocketOpen() {
        this.state = STATE_CONNECTED;
        lightCtrl.indicateSystemInitSuccess();
    }

    handleSocketClose() {
        console.log('socket connection closed');
        this.reconnect();
    }

    handleSocketConnectionError() {
        this.state = STATE_AUTHENTICATION_FAILED;
        lightCtrl.indicateSystemInitError();
    }

    connect() {
        return;
        if (this.webSocket) {
            throw new Error('socket already initialized');
        }

        if (!configCtrl.isBlisstributeConfigured()) {
            throw new Error('blisstribute not properly configured');
        }

        const authData = {
            client: configCtrl.getBlisstributeRestClient(),
            user: configCtrl.getBlisstributeRestUser(),
            password: configCtrl.getBlisstributeRestPassword()
        };

        axios.post(configCtrl.getBlisstributeRestUrl() + '/v1/login/authenticate', authData)
            .then((authResult) => {
                let header = { headers: {"Authorization" : `Bearer ${authResult.data.response.jwt}`} };
                axios.get(configCtrl.getBlisstributeRestUrl() + '/v1/login/getWebSocketAccessLink', header)
                    .then((socketLinkResult) => {
                        this.webSocket = new WebSocket(socketLinkResult.data.response.socketLink);
                        this.webSocket.onopen = this.handleSocketOpen;
                        this.webSocket.onclose = this.handleSocketClose;
                        this.webSocket.onerror = this.handleSocketClose;
                        this.webSocket.onmessage = this.constructor.handleSocketMessage;
                    }).catch((err) => {
                        this.handleSocketConnectionError();
                    });
            })
            .catch((err) => {
                this.handleSocketConnectionError();
            });
    }

}

module.exports = new BlissSocketController();
