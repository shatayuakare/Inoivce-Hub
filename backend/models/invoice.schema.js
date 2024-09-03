import mongoose from "mongoose";

const invoiceSchema = mongoose.Schema({
    series: {
        type: Number,
        default: 1000
    },
    customerName: {
        type: String,
        required: true
    },
    customerAddress: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    products: [
        {
            title: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                default: 1
            },
            total: {
                type: Number,
                default: 0
            }
        }
    ],
    payment: {
        type: String,
        required: true
    },
    auther: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
})

const Invoices = mongoose.model("invoices", invoiceSchema)

export default Invoices
