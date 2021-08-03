const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./router/auth.router'))

const PORT = config.get('port') || 5000
const MONGO_URI = config.get('mongoUri')

async function start() {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        app.listen(PORT, () => {
            console.log(`The APP has been started on host: ${PORT}`)
        })
    } catch(e) {
        console.log(e)
        process.exit(1)
    }
}

start()