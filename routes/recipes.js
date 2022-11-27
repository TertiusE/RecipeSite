const express = require("express")
const router = express.Router()

const { check, validationResult } = require('express-validator');

let Recipe = require("../models/recipes")
router
    .route("/add")
    .get((req, res) => {
        res.render('add_recipe')
    })
    .post(async (req, res) => {
        //This does an asynchronous check of our form elements and creates a validation chain
        await check("name", "Name is required").notEmpty().run(req)
        await check("description", "A description is required").notEmpty().run(req)
        await check("difficulty", "A difficulty is required").notEmpty().run(req)
        await check("ingredients", "Ingredients are required").notEmpty().run(req)
        await check("steps", "Steps are required").notEmpty().run(req)

        //Get all of the validation errors
        const errors = validationResult(req)

        if (errors.isEmpty()) {
            let recipe = new Recipe()
            recipe.name = req.body.name
            recipe.description = req.body.description
            recipe.difficulty = req.body.difficulty
            recipe.ingredients = req.body.ingredients
            recipe.steps = req.body.steps
            //Save recipe to the database
            recipe.save((err) => {
                if (err) {
                    console.log(err)
                } else {
                    res.redirect("/")
                }
            })
        } else {
            res.render("add_recipe", {
                errors: errors.array(),
            })
        }
    })

router
    .route("/:id")
    .get((req, res) => {
        Recipe.findById(req.params.id, (err, recipe) => {
            res.render("recipe", { recipe })
        })
    })
    .delete((req, res) => {
        let query = { _id: req.params.id }

        Recipe.deleteOne(query, (err) => {
            if (err) {
                console.log(err)
            }
            res.send("Successfully Deleted")
        })
    })


router
    .route("/edit/:id")
    .get((req, res) => {
        Recipe.findById(req.params.id, (err, recipe) => {
            res.render("edit_recipe", {
                recipe: recipe,
                genres: genres
            })
        })
    })
    .post((req, res) => {
        let recipe = {}
        recipe.name = req.body.name
        recipe.description = req.body.description
        recipe.difficulty = req.body.difficulty
        recipe.ingredients = req.body.ingredients
        recipe.steps = req.body.steps

        let query = { _id: req.params.id }

        //Update Recipe in MongoDB
        Recipe.updateOne(query, recipe, (err) => {
            if (err) {
                console.log(err)
            }
            else {
                res.redirect("/")
            }
        })

    })

module.exports = router