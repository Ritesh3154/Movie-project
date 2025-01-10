const express = require('express')
const { default: mongoose } = require('mongoose')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => res.send('Hello World!'))

const MoviewRouter = require('./router/MovieRouter')
app.use('/api/movie', MoviewRouter)

mongoose.connect('mongodb://localhost:27017/movie')
    .then(() => {
        console.log("connnectedd👍👍")
    }).catch((err) => {
        console.log(err)
    })

app.listen(PORT, () => console.log(`Example app listening on PORT http://localhost:${PORT}`))