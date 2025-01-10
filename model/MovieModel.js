const { Schema, model } = require("mongoose");

const movieSchema = new Schema({
    movie_name: {
        type: String,
        required: true,
        trim: true,
    },
    movie_description: {
        type: String,
        required: true,
        trim: true,
    },
    director_name: {
        type: String,
        required: true,
        trim: true,
    },
    movie_category: {
        type: String,
        required: true,
    },
    movie_image: {
        type: String
    },
    movie_posters: {
        type: []
    }
})

const movie = model('Movie', movieSchema)
module.exports = movie