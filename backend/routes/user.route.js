import express from "express"
import { getUser, getUsers, login, signup } from "../controller/user.controller.js"

const userRoute = express.Router()

userRoute.get("/", getUsers)
userRoute.get("/:id", getUser)
userRoute.post("/signup", signup)
userRoute.post("/login", login)

export default userRoute