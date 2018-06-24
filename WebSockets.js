function startWebSocket(cb, port) {
    if (!port) {
        return;
    }

    const ws = new WebSocket('ws://' + port + ':3500');  // wss localhost === 10.0.2.2

    ws.onopen = () => {
        // connection opened
        // console.log('ws send ', 'something');
        // console.log(Object.keys(ws));
        // console.log(ws['CONNECTING']);
        // console.log(ws['OPEN']);
        // console.log(ws['CLOSING']);
        // console.log(ws['CLOSED']);
        // console.log(ws['readyState']);
        // console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(ws)));
        // ws.send('something'); // send a message
        // Array [
        //   "constructor",
        //   "close",
        //   "send",
        //   "ping",
        //   "_close",
        //   "_unregisterEvents",
        //   "_registerEvents",
        //   "binaryType",
        // ]
        // console.log('open');
        cb('open');
    };

    ws.onmessage = (e) => {
        // a message was received
        // console.log('ws message ', e.data);
        cb('message', e.data);
    };

    ws.onerror = (e) => {
        // an error occurred
        // console.log('ws error ', e.message);
        // console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(ws)));
        cb('error', e.message);
    };

    ws.onclose = (e) => {
        // connection closed
        // console.log('ws close ', e.code, e.reason);
        cb('close', e.code + ' - ' + e.reason);
    };

    return ws;
}

export default startWebSocket;
