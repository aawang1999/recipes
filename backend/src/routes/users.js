import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { UserModel } from '../models/Users.js'

// For login and registration.

const router = express.Router()

router.post("/register", async (req, res) => {
  const { username, password } = req.body
  const user = await UserModel.findOne({ username })
  if (user) return res.status(400).json({ message: "User already exists." })
  const hashedPassword = await bcrypt.hash(password, 10)
  const newUser = new UserModel({ username, password: hashedPassword })
  await newUser.save()
  res.status(200).json({ message: "User registered." })
})

router.post("/login", async (req, res) => {
  const { username, password } = req.body
  const user = await UserModel.findOne({ username })
  if (!user) return res.status(400).json({ messsage: "User doesn't exist." })
  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) return res.status(400).json({ message: "Username or password is incorrect." })
  const token = jwt.sign({ id: user._id }, "secret")
  res.status(200).json({ token, userId: user._id })
})

export { router as userRouter }

// Middleware to verify token.

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization
  if (token) {
    jwt.verify(token, "secret", (err) => {
      if (err) return res.sendStatus(403)
      next()
    })
  } else {
    res.sendStatus(401)
  }
}