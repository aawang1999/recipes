import express from 'express'
import mongoose from 'mongoose'
import { RecipeModel } from "../models/Recipes.js"
import { UserModel } from '../models/Users.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const response = await RecipeModel.find({})
    res.status(200).json(response)
  } catch (err) {
    res.status(400).json({ message: err })
  }
})

router.get('/savedRecipes/ids/:userId', async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId)
    res.status(200).json({ savedRecipes: user?.savedRecipes })
  } catch (err) {
    res.status(400).json({ message: err })
  }
})

router.get('/savedRecipes', async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userId)
    const savedRecipes = await RecipeModel.find({
      _id: { $in: user.savedRecipes }
    })
    res.status(200).json({ savedRecipes })
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

router.put('/', async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.body.recipeId)
    const user = await UserModel.findById(req.body.userId)
    user.savedRecipes.push(recipe)
    await user.save()
    res.status(200).json({ savedRecipes: user.savedRecipes })
  } catch (err) {
    res.status(400).json({ message: err })
  }
})

export { router as recipeRouter }