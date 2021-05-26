const WebSocket = require('ws');
require('dotenv').config()

const wss = new WebSocket.Server({ port: process.env.PORT });

wss.on('connection', function connection(ws) {
  setInterval(function() {
    ws.send('ping');
  }, 10000);
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});