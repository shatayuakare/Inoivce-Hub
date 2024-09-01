import Invoices from "../models/invoice.schema.js";

let series = 1000
export const getInvoices = async (req, res) => {
    try {
        const invoices = await Invoices.find()
        if (!invoices) return res.status(404).json({ message: "No data found" })
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

export const newInvoice = (req, res) => {
    try {
        const { customerAddress, customerName, products, auther } = req.body;

        const createInvoice = new Invoices({
            series: series++, customerName, customerAddress, products, auther
        })

        createInvoice.save()

        res.status(201).json({
            message: "Invoice Generated",
            createInvoice
        })
    } catch (error) {
        res.status(400).json(error.message)
    }
}