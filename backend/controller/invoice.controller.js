import mongoose from "mongoose";
import Invoices from "../models/invoice.schema.js";
import Users from "../models/user.schema.js"

export const getInvoices = async (req, res) => {
    try {
        const invoices = await Invoices.find()
        if (!invoices) return res.status(404).json({ message: "No data found" })
        // const invoices = await Invoices.find();
        // console.log("length : ", invoices.length)

        res.status(200).json(invoices)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

export const getInvoice = async (req, res) => {
    try {
        const id = req.params.id;
        const invoice = await Invoices.findOne({ _id: id })
        if (!invoice) return res.status(404).json({ message: "No data found" })
        res.status(200).json(invoice)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

export const newInvoice = async (req, res) => {
    try {
        const { customerAddress, customerName, products } = req.body;

        const invoices = await Invoices.find();

        const createInvoice = new Invoices({
            series: invoices.length + 1, customerName, customerAddress, products, auther: mongoose.Types.ObjectId()
        })

        await createInvoice.save().then((invoice) => {
            return Users.updateOne({ _id: createInvoice.auther }, { $push: { invoices: invoice._id } })
        }).then(() => console.log(`Invoice ${createInvoice._id} and ${invoices._id}`))

        res.status(201).json({
            message: "Invoice Generated",
            invoice: createInvoice
        })
    } catch (error) {
        res.status(400).json(error.message)
    }
}