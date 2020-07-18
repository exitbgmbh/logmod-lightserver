const configCtrl = require('./config');
const axios = require('axios/index');
const WebSocket = require('ws');
const lightCtrl = require('./light');
const eventCtrl = require('./event');

class BlissSocketController {

    static handleSocketMessage(message) {
        console.log('got socket messsage', message.data);
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
    }

    handleSocketOpen() {
    
    }

    handleSocketClose() {
        console.log('socket connection closed');
        this.reconnect();
    }

    handleSocketConnectionError() {
    
    }

    connect() {
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

        console.log('connect to blisstribute');
        axios.post(configCtrl.getBlisstributeRestUrl() + '/v1/login/authenticate', authData)
            .then((authResult) => {
                console.log('got jwt', authResult.data.response.jwt);
                let header = { headers: {"Authorization" : `Bearer ${authResult.data.response.jwt}`} };
                axios.get(configCtrl.getBlisstributeRestUrl() + '/v1/login/getWebSocketAccessLink', header)
                    .then((socketLinkResult) => {
                        console.log('got socket link', socketLinkResult.data.response.socketLink);
                        this.webSocket = new WebSocket(socketLinkResult.data.response.socketLink);
                        this.webSocket.onopen = this.handleSocketOpen.bind(this);
                        this.webSocket.onclose = this.handleSocketClose.bind(this);
                        this.webSocket.onerror = this.handleSocketClose.bind(this);
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

const blissSocketCtrl = new BlissSocketController();
module.exports = blissSocketCtrl;
