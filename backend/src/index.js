import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { userRouter } from './routes/users.js'
import { recipeRouter } from './routes/recipes.js'

const app = express()

app.use(express.json())
app.use(cors())
app.use("/auth", userRouter)
app.use("/recipes", recipeRouter)

mongoose.connect("mongodb+srv://aawang99:password12345@recipes.7bff0nu.mongodb.net/recipes?retryWrites=true&w=majority")

app.listen(5500, () => console.log('Server listening on port 5500.'))