const Movie = require("../model/MovieModel")
const path = require('path')
const fs = require('fs')

exports.store = async (req, res) => {

    var arr = []

    req.files.movie_posters.forEach(ele => {
        arr.push(ele.filename)
    });
    var singleImg = ""
    if (req.files.std_resume !== undefined) {
        singleImg = req.files.std_resume[0].filename
    }
    try {
        const { movie_name, movie_description, director_name, movie_category } = req.body

        if (movie_name == "" || movie_description == "" || director_name == "" || movie_category == "") {
            console.log("all fields are required!!!")
        } else {
            console.log(req.files);

            const movie = await Movie.create({
                movie_name, movie_description, director_name, movie_category, movie_image: singleImg, movie_posters: arr
            })
            if (movie) {
                res.json({
                    success: true,
                    message: "data inserted✅✅✅✅✅✅✅"
                })
            }
        }

    } catch (error) {
        console.log(error)
    }
}
exports.index = async (req, res) => {
    const movies = await Movie.find()
    res.json({
        success: true,
        movies
    })
    // res.json('index API')
}

exports.trash = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id);

        const single = await Movie.findById(id)
        console.log(single);

        //find image path
        const image = path.join(__dirname, `../uploads/${single.movie_image}`)
        console.log(image);

        fs.unlink(image, (err) => {
            if (err) {
                console.log("img is not deleted");
            } else {
                console.log("img is deleted");
            }
        })

        await Movie.findByIdAndDelete(id)
        res.json("deleted")
    } catch (error) {
        console.log(error);
    }
}
// exports.update = async (req, res) => {
//     var arr = [];

//     // Iterate over movie posters to extract filenames
//     // req.files.movie_posters.forEach(ele => {
//     //     arr.push(ele.filename)
//     // });

//     req.files.movie_posters.forEach((element) => {
//         arr.push(element.filename)
//     });


//     var singleImg = "";
//     if (req.files.std_resume !== undefined) {
//         singleImg = req.files.std_resume[0].filename;
//     }

//     const { id } = req.params;
//     const { movie_name, movie_description, director_name, movie_category } = req.body;

//     try {
//         const movie = await Movie.findByIdAndUpdate(id, {
//             movie_name,
//             movie_description,
//             director_name,
//             movie_category,
//             movie_image: singleImg,
//             movie_posters: arr
//         }, { new: true });

//         // If movie not found or update failed, return an error
//         if (!movie) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Movie not found or update failed."
//             });
//         }

//         // If the movie is successfully updated, send success message
//         res.json({
//             success: true,
//             message: "Movie updated successfully✅"
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             success: false,
//             message: "Something went wrong."
//         });
//     }
// }



exports.update = async (req, res) => {

    var arr = []
    req.files?.movie_posters?.forEach((images) => {
        arr.push(images.filename)
    })
    console.log(arr);
    // console.log(req.files.poster_path[0].filename);

    var singleImg = "";
    if (req.files.movie_image !== undefined) {
        singleImg = req.files.movie_image[0].filename
    }


    const { id } = req.params
    const { movie_name, movie_description, director_name, movie_category } = req.body

    await Movie.findByIdAndUpdate({ _id: id }, {
        movie_name, movie_description, director_name, movie_category,
        movie_image: singleImg,
        movie_posters: arr
    })
    res.json({
        success: true,
        message: "record updated"
    })
}