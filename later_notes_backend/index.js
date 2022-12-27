const express = require("express")
const cors = require("cors")
const multer = require('multer');
const path = require("path");
const socket = require("socket.io");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

const router = require("./Routes/routes")
 
app.use(cors());
app.use(express.json());
app.use('/public', express.static('public'));
app.use(router);

 
const server = app.listen(port, () => {
  console.log(`Server is running at port no ${port}`);
})

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

io.on("connection", (socket) => {

  socket.on("joinRoom", (data) => {
    socket.join(data)
  })

  socket.on("updating", (data) => {
    socket.to(data.room).emit("receiveMessage", data.message)
  });
})


















































