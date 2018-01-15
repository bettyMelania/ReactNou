import {connect} from "react-redux";

const io = require('socket.io-client');
import {serverUrl} from '../core/api';
import {productUpdated} from './service';


const PRODUCT_UPDATED = 'product/updated';

export class Notification {
    constructor(token,dispatch) {
        this.token = token;
        this.dispatch=dispatch;
    }

    connect() {

        console.log(`socket connect...`);
        this.socket = io(serverUrl, {transports: ['websocket']});
        const socket = this.socket;
        socket.on('connect', () => {
            console.log('connected');
            socket
                .emit('authenticate', {token: this.token})
                .on('authenticated', () => console.log(`socket authenticated`))
                .on('unauthorized', (msg) => console.log(`socket unauthorized: ${JSON.stringify(msg.data)}`))
        });
        socket.on(PRODUCT_UPDATED, (product) => {
            console.log(PRODUCT_UPDATED);
            this.dispatch(productUpdated(product))
        });
    };

    disconnect() {
        console.log(`socket disconnect`);
        this.socket.disconnect();
    }
}