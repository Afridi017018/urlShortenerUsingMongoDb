const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()
const shortid = require("shortid")


const app = express()

app.use(express.json())

///mongodb connection
mongoose.connect(process.env.URI)
    .then(() => {
        console.log("DB Connected!!!")
    })
    .catch((err) => {
        console.log(err)
    })

///

///mongoose schema

const urlSchema = new mongoose.Schema({
    shortUrl: {
        type: String,
        required: true,
        unique: true
    },
    redirectUrl: {
        type: String,
        required: true
    }
})

const Url = mongoose.model("url", urlSchema)

///

app.get("/", (req, res) => {
    res.redirect("https://www.google.com")
})

app.post("/url", async (req, res) => {
    const { url } = req.body
    const shortId = shortid()


    const newUrl = new Url({
        shortUrl: shortId,
        redirectUrl: url
    })

    await newUrl.save()
    // console.log("test")
    res.send(newUrl)
})


app.get("/:shortId", async (req, res) => {
    const { shortId } = req.params;
    const data = await Url.findOne({ shortUrl: shortId })
    // console.log(data)
    res.redirect(data.redirectUrl)
})



module.exports = app;

