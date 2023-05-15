const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const axios = require("axios");
const userRoute = require("./route/users");
const authRoute = require("./route/auth");
const postRoute = require("./route/posts");

const app = express();//init app object from express
dotenv.config();//use environment variables
const PORT = process.env.PORT;//define port no
//connect to a local mongodb database
mongoose.connect(process.env.MONGO_URI,() => {
    console.log("Connect to mongodb database locally");
});
//middlewares
app.use(cors());//use cross origin requests
app.use(bodyParser.json());//using json data
app.use(helmet());
app.use(morgan("common"));

//default request params
app.use('/api/users',userRoute);
app.use("/api/auth",authRoute);
app.use("/api/posts",postRoute);

//listen
app.listen(process.env.PORT,()=> {
    console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
})