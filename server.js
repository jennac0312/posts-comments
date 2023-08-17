const express = require('express')
const app = express()
const PORT = 3000

const Post = require("./models/Post")

require("dotenv").config() // npm i dotenv ( environment variables )
const mongoose = require('mongoose') // npm i mongoose
const MONGO_URI = process.env.MONGO_URI // has tp be after dotenv

// MIDDLEWARE
app.use(express.json({ extended: false })); // has to do with body parsing "everything will be parsed into json data"... puts req data in req.body ( sine post recieves data it needs this middleware )

// CONNECT TO DATABASE
mongoose.connect( MONGO_URI, {
    // rules to follow when using mongoose
    useNewUrlParser: true, // separated front end data into useable chunks for backend... workable format
    useUnifiedTopology: true,
})
mongoose.connection.once( 'open', () => {
    console.log( 'Connected to mongoDB' )
})

// ROUTES 
// routes go most to least specific ( INDUCES method - shoutout Dylan)

// app.get( '/', ( req, res ) => {
    //     res.send(`Testing testing`)
    // })

    // read route should be first
    // anytime youre going to database have to do capital model/schema, followed by verb
app.get( '/', async ( req, res ) => {
    try {
        const allPosts = await Post.find( {} ) // creating a variable to poulate with all entities of the Post type
        res.send(allPosts)
    } catch (error) {
        console.error(error)
        // catch will always be server side error
        res.status(500).json( { error: error.message } )
    }
})


// C -> create. need to first make a model schema
    //  every route that deals with database should have trycatch and sync/await. ( dont always need but good to have )
app.post( '/', async ( req, res ) => {

    try {
       const post = await Post.create( req.body )
       res.send( post ) // this will have _id from database
    } catch (error) {
        console.error( error )
        // res.status(500).json( { error: error.message } )
    }

    // TESTING
    // - headers content-type application/json
    // - body json { }
})

// delete should go above update
app.delete( '/:id', async ( req, res ) => {

    let { id } = req.params

    try {
        await Post.findByIdAndDelete( id )
        res.send( 'Post has been deleted' ) // just so we know it ran
    } catch (error) {
        res.status(500).send( "Server error" )
    }



})


// UPDATE ROUTE
app.put( '/:id', async ( req, res ) => {

    let { id } = req.params

    try {
        // ( what's being updated, what it's being updated to, { rules to follow on return }  )
        const post = await Post.findByIdAndUpdate( id, req.body, {
            new: true // this returns updated post and not pre-updated
        } ) // id will come from req
        res.send( post )
    } catch (error) {
        console.error(error)
        res.status(500).send( "Server error" )
    }
})


app.listen( PORT, ( req, res ) => {
    console.log(`Server is running on PORT ${PORT}`)
})