import Users from "../models/user.schema.js";
import bcrypt from "bcryptjs"


export const getUsers = async (req, res) => {
    try {
        const users = await Users.find()
        if (!users) return res.status(404).json({ message: "No Data Found" })
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await Users.findOne({ _id: req.params.id })
        if (!user) return res.status(404).json({ message: "No Data Found" })
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
export const signup = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        const user = await Users.findOne({ email })
        if (user) return res.status(200).json({ message: "User already exisit" })

        const hash = await bcrypt.hash(password, 10)

        const createUser = new Users({
            fullName, email, password: hash
        })

        createUser.save();

        res.status(201).json({
            message: "Sign up Successfully",
            user: createUser
        })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Users.findOne({ email })
        const isValid = await bcrypt.compare(password, user.password)
        if (!user || !isValid) return res.status(404).json({ message: "Email or password incorrect" })

        res.status(200).json({
            message: "Login Successfully",
            user
        })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}