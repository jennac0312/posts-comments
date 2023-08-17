const express = require('express')
const app = express()
const PORT = 3000

require("dotenv").config() // npm i dotenv ( environment variables )
const mongoose = require('mongoose') // npm i mongoose
const MONGO_URI = process.env.MONGO_URI // has tp be after dotenv

// connect to database
mongoose.connect( MONGO_URI, {
    // rules to follow when using mongoose
    useNewUrlParser: true, // separated front end data into useable chunks for backend... workable format
    useUnifiedTopology: true,
})
mongoose.connection.once( 'open', () => {
    console.log( 'Connected to mongoDB' )
})

app.get( '/', ( req, res ) => {
    res.send(`Testing testing`)
})


app.listen( PORT, ( req, res ) => {
    console.log(`Server is running on PORT ${PORT}`)
})