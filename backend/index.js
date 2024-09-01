import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import invoiceRoute from "./routes/invoice.route.js";
import mongoose from "mongoose";
import userRoute from "./routes/user.route.js";

const app = express()
dotenv.config();


const port = process.env.PORT || 4001
const mongodb = process.env.MONGODB

app.use(express.json())
app.use(cors())

app.use("/invoice", invoiceRoute)
app.use("/auth", userRoute)

app.listen(port, () => {
    console.log(`Server working on ${port} port`)
    mongoose.connect(mongodb).then(() => {
        console.log("Database connected")
    }).catch((err) => console.log(err.message))
})