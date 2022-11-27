const express = require('express')
const app = express()
const path = require("path")
const recipeRouter = require("./routes/recipes")
const config = require("./config/database")
const mongoose = require("mongoose")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//Connecting to the database
mongoose.connect(config.database)
let db = mongoose.connection

//Check the database connection
db.once("open", ()=>{
    console.log('Connected to MongoDB');
})

db.on("error", (err)=>{
    console.log("DB Error")
})


app.set('', path.join(__dirname, "views"))
app.set('view engine', 'pug')
app.use('/recipes', recipeRouter)

//Attaching the routes to app
app.use('/', (req, res)=> {
    // Recipe.find({}, (err, recipes)=>{
    //     if (err){
    //         console.log("error")
    //     }else {
    //         res.render("index", {
    //             title: "Recipe Book",
    //             recipes: recipes
    //         })
    //     }
    // })
    res.send("Bookstore")
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {console.log(`Server is now running on port ${PORT}`)})

