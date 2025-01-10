const express = require('express')
const app = express()

const MoviewController = require('../controller/MovieController')
const upload = require('../middleware/uploadFile')

const multipleFields = [
    { name: "movie_image", count: 1 },
    { name: "movie_posters", count: 3 }
]

app.post('/', upload.fields(multipleFields), MoviewController.store)
app.get('/', MoviewController.index)
app.delete('/:id', MoviewController.trash)
app.put('/:id', upload.fields(multipleFields), MoviewController.update)
module.exports = app