import express from "express"
import { getInvoice, getInvoices, newInvoice } from "../controller/invoice.controller.js"

const invoiceRoute = express.Router()

invoiceRoute.get("/", getInvoices)
invoiceRoute.get("/:id", getInvoice)
invoiceRoute.post("/create", newInvoice)


export default invoiceRoute