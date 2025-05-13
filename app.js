const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3500;

const connectDB = require("./db/connect");
const chat = require("./function/Chat"); 

app.use(express.json());
app.use(cors({
    origin: '*', // or '*'
    credentials: true
  }));
  
app.use("/api", require("./routes/user"));
app.use("/api", require("./routes/chat"));

const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
        credentials: true
    }
});

io.on("connection", (socket) => {
    console.log("New Socket Connected! :", socket.id);

    socket.on("joinRoom", async ({roomId, userId})=>{
        socket.join(roomId);
        console.log(`${userId} joind room ${roomId}`);
    });

    socket.on('sendMessage', async (message) => {
        await chat.createMessage(message);
        console.log('Message sent:', message);
        io.to(message.roomId).emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('Socket disconnected:', socket.id);
      });
});

const start = async () => {
    try {
        connectDB();
        server.listen(PORT, () => {
            console.log(`Server is Running on PORT: ${PORT}`);
        })
    } catch (error) {
        console.log("Having Errors :", error);
    }
};

start();