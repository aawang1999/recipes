import express from 'express'
import mongoose from 'mongoose'
import { RecipeModel } from "../models/Recipes.js"

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const response = await RecipeModel.find({})
    res.status(200).json(response)
  } catch (err) {
    res.status(400).json({ message: err })
  }
})

router.post('/', async (req, res) => {
  const recipe = new RecipeModel(req.body)
  try {
    const response = await recipe.save()
    res.status(200).json(response)
  } catch (err) {
    res.status(400).json({ message: err })
  }
})

export { router as recipeRouter }