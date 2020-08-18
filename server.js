const express = require("express")
const app = express()
const { v4 } = require("uuid")
const morgan = require("morgan")
const mongoose = require("mongoose")


app.use(express.json())
app.use(morgan("dev"))

mongoose.connect("mongodb://localhost:27017/bountiesdb",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
    () => console.log("Connected to the mongo database")
)

//Routes
app.use("/bounty", require("./routes/bountyRouter"))





app.listen(9000, () => {
    console.log("Using port 9000")
})