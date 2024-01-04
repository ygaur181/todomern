const express = require("express");
const {connect,dbModel} = require("./utils/db")
const router = require("./routers/route");
const userRoute = require("./routers/userRoute");
const dotenv = require("dotenv");
var cors = require('cors');

const app = express();
dotenv.config({path : './.env'})

app.use(cors())
app.use(express.json());


connect();

app.use("/api/v1", router);
app.use("/api/auth", userRoute);

const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`port connected at ${PORT}`);
});