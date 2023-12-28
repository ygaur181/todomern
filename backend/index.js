const express = require("express");
const {connect,dbModel} = require("./utils/db")
const router = require("./routers/route");
const userRoute = require("./routers/userRoute");
var cors = require('cors')

const app = express();

app.use(cors())
app.use(express.json());


connect();

app.use("/api/v1", router);
app.use("/api/auth", userRoute);

const PORT = 4001;
app.listen(PORT, ()=>{
    console.log(`port connected at ${PORT}`);
});