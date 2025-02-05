import { WebSocket, WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });


let senderSocket: null | WebSocket = null;
let receiverSocket: null | WebSocket = null;

wss.on("connection", function connection(ws) {
    ws.on('error', console.error);

    ws.on('message', function message(data) {
        const message = JSON.parse(data.toString());
        if(message.type === "identify-as-sender") {
            senderSocket = ws;
        } else if(message.type === "identify-as-receiver") {
            receiverSocket = ws;
        } else if(message.type === "create-offer") {
            receiverSocket?.send(JSON.stringify({ type: "offer", offer: message.offer }));
        } else if(message.type === "create-answer") {
            senderSocket?.send(JSON.stringify({ type: "answer", answer: message.answer }));
        }
    });

    ws.send('something');
});