import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

const app = express()

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://aawang99:password12345@recipes.7bff0nu.mongodb.net/recipes?retryWrites=true&w=majority")

app.listen(5500, () => console.log('Server listening on port 5500.'))