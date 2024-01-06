const express = require("express");
const {connect,dbModel} = require("./utils/db")
const router = require("./routers/route");
const userRoute = require("./routers/userRoute");
const dotenv = require("dotenv");
var cors = require('cors');
const path = require("path")

const app = express();
dotenv.config({path : './.env'})

app.use(cors())
app.use(express.json());


connect();

app.use("/api/v1", router);
app.use("/api/auth", userRoute);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
  });

module.exports = app;
