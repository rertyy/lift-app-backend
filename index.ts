import express, { Express } from "express";
import http from "http";
import WebSocket from "ws";
import "dotenv/config";
import { randomUUID } from "crypto";
import { handleMessageFromClient } from "./websockets/handleMessageFromClient";
import { Client, Uuid } from "./models/types";
import { look } from "./lift/lift";

const app: Express = express();
const port = process.env["PORT"];
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const clients: Client = {};

// https://www.npmjs.com/package/ws
wss.on("connection", (ws: WebSocket) => {
  const id = onConnect(ws);
  const idSlice = id.slice(0, 8);
  console.log(`new connection: ${idSlice}`);

  ws.on("error", console.error);

  // Send a message with the specific data
  ws.on("message", function message(data) {
    console.log(`received from client: ${data}`);
    // an example of string that can be sent is {"type":1,"floorNum":1}
    handleMessageFromClient(data);
  });

  // Send a message once closed
  ws.on("close", (ws: WebSocket) => {
    console.log("connection closed");
    onCloseConnection(ws, id);
  });
});

//start our server
server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

setInterval(() => {
  look();
}, 500);

/* The below are functions that use wss*/

function onConnect(ws: WebSocket): Uuid {
  let id = randomUUID();
  const idSlice = id.slice(0, 8);
  clients[id] = ws;

  // let all clients know that a new client has connected
  broadcastFromClient(
    {
      type: "newClient",
      id: idSlice,
      numConnected: wss.clients.size,
    },
    false,
    ws,
    true,
  );
  return id;
}

function onCloseConnection(ws: WebSocket, id: Uuid) {
  console.log(`connection ${id.slice(0, 8)} closed`);
  delete clients[id];
  broadcastFromClient(
    JSON.stringify({
      type: "clientLeft",
      id: id.slice(0, 8),
      connected: wss.clients.size,
    }),
    false,
    ws,
    false,
  );
}

export function broadcastFromServer(data: any, isBinary: boolean = false) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      if (typeof data !== "string") {
        data = JSON.stringify(data);
      }
      client.send(data, { binary: isBinary });
    }
  });
}

export function broadcastFromClient(
  data: any,
  isBinary: boolean,
  host: WebSocket,
  includeSelf: boolean = true,
) {
  wss.clients.forEach((client) => {
    if (
      client.readyState === WebSocket.OPEN &&
      (includeSelf || client != host)
    ) {
      if (typeof data !== "string") {
        data = JSON.stringify(data);
      }
      client.send(data, { binary: isBinary });
    }
  });
}
