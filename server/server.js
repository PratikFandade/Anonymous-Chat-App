// Importing packages
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const aes = require('crypto-js/aes')

// Importing Connection details
require('dotenv').config()

// Connecting Middleware
const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

// Connecting MongoDB Datbase
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

const conn = mongoose.connection
conn.once('open', ()=>{
    console.log("MongoDB Connection established")
})

// Connecting Routes
const userRouter = require('./routes/users')
app.use('/users', userRouter)

var server = app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})

const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
})
io.on('connection', socket => {
    const id = socket.handshake.query.id
    socket.join(id)

    socket.on('send-message', ({ recipients, text }) => {
        recipients.forEach(recipient => {
            const newRecipients = recipients.filter(r => r !== recipient)
            newRecipients.push(id)
            socket.broadcast.to(recipient).emit('receive-message', {
                recipients: newRecipients, sender: id, text
            })
        })
    })
})