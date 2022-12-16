const express = require("express")
const cors = require("cors")
const multer = require('multer');
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

const router = require("./Routes/routes")
 
app.use(cors());
app.use(express.json());
app.use('/public', express.static('public'));
app.use(router);

 
app.listen(port, () => {
  console.log(`Server is running at port no ${port}`);
})



















































