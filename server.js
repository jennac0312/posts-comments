const express = require('express')
const app = express()
const PORT = 3000


app.get( '/', ( req, res ) => {
    res.send(`Testing testing`)
})


app.listen( PORT, ( req, res ) => {
    console.log(`Server is running on PORT ${PORT}`)
})