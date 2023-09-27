const express = require("express");

const app = express();

// auth middleware
const auth = require("./middlewares/auth.middleware");


const cors = require("cors");


app.use(cors(
    {
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204,
    }
));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const appRoutes = require("./routes/index");

app.use("/", appRoutes);

app.get("/", (req, res) => {
    res.send("Hello World!");
});


module.exports = app;
