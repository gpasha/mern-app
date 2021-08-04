const express = require('express')
const path = require('path')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./router/auth.router'))
app.use('/api/link', require('./router/link.router'))
app.use('/t', require('./router/redirect.router'))


console.log('process.env.NODE_ENV: ', process.env.NODE_ENV)

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}


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