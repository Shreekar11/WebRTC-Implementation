"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let senderSocket = null;
let receiverSocket = null;
wss.on("connection", function connection(ws) {
    ws.on('error', console.error);
    ws.on('message', function message(data) {
        const message = JSON.parse(data.toString());
        if (message.type === "identify-as-sender") {
            senderSocket = ws;
        }
        else if (message.type === "identify-as-receiver") {
            receiverSocket = ws;
        }
        else if (message.type === "create-offer") {
            receiverSocket === null || receiverSocket === void 0 ? void 0 : receiverSocket.send(JSON.stringify({ type: "offer", offer: message.offer }));
        }
        else if (message.type === "create-answer") {
            senderSocket === null || senderSocket === void 0 ? void 0 : senderSocket.send(JSON.stringify({ type: "answer", answer: message.answer }));
        }
    });
    ws.send('something');
});
