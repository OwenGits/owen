import openSocket from 'socket.io-client';

let PokerSokectIO = openSocket.connect(window.localHostUrl.localUrl);

export default class PokerSokect {

    static wsConnection () {
        PokerSokectIO.on('connection', (socket) => {
            console.log('发送PokerSokect。soket请求。。。。。。。。');
            socket.on('disconnect', () => {
                console.log('user disconnected');
            });
        });
    }
    static emitUserConnect (user) {
        PokerSokectIO.emit('userConnect', user);
    }
    static emitPokerMsg (data) {
        PokerSokectIO.emit('send', data);
    }
    static emitStartPlay(data) {
        PokerSokectIO.emit('startPlay', data);
    }
    static emitUserLeave(data){
        PokerSokectIO.emit('userLeave', data);
    }
    static emitPassCard(data){
        PokerSokectIO.emit('passCard', data);
    }

    static onReceiveMessage (callBack) {
        PokerSokectIO.on('receiveMessage', callBack);
    }
    static onLeave (callBack) {
        PokerSokectIO.on('leave', callBack);
    }
    static onUserJoin (callBack) {
        PokerSokectIO.on('userJoin', callBack);
    }
    static onSendSoketId (callBack) {
        PokerSokectIO.on('sendSoketId', callBack);
    }
    static onGetCards (callBack) {
        PokerSokectIO.on('getCards', callBack);
    }
    static onCanPlay (callBack) {
        PokerSokectIO.on('canPlay', callBack);
    }
    static onCurrentPlayer (callBack) {
        PokerSokectIO.on('currentPlayer', callBack);
    }
    static onBpokerCardNumber (callBack) {
        PokerSokectIO.on('bpokerCardNumber', callBack)
    }
    static onApokerCardNumber (callBack) {
        PokerSokectIO.on('apokerCardNumber', callBack)
    }
    static onGotWinner (callBack) {
        PokerSokectIO.on('gotWinner', callBack)
    }
    static onCannotPass (callBack) {
        PokerSokectIO.on('cannotPass', callBack)
    }
}