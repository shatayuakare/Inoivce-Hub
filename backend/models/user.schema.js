import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    invoices: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "invoices"
        }
    ]
})


const Users = mongoose.model("users", userSchema)

export default Users