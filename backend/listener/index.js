const WebSocket = require("ws");
const dotenv = require("dotenv");
let { Server } = require("socket.io");

dotenv.config({
  path: process.env.NODE_ENV === "prod" ? ".env.prod" : ".env.dev",
});

const EMITTER_NAME = process.env.EMITTER_NAME;
const PORT = process.env.EMITTER_PORT;
const NODE_LISTENER_PORT = process.env.LISTENER_PORT;

const io = new Server();

const ws = new WebSocket(`ws://${EMITTER_NAME}:${PORT}`, {
  perMessageDeflate: false,
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on('py', (data) => {
    ws.send(data);
  })
});

ws.on("open", function open() {
  console.log("Connected to WebSocket server");
});

ws.on("message", function message(data) {
  console.log("Message from WebSocket server:", data.toString());
  io.emit("message", data.toString());
});

ws.on("close", function close() {
  console.log("Disconnected from WebSocket server");
});

ws.on("error", function error(error) {
  console.error("WebSocket error:", error);
});

io.listen(NODE_LISTENER_PORT, {
  cors: {
    origin: "*",
    methods: "*",
  },
})