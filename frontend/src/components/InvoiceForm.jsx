import React, { useState } from 'react'
import axios from "axios"
import { useAuth } from '../context/AuthProvider'

const InvoiceForm = ({ productsHandler }) => {

    const [authUser, setAuthUser] = useAuth()
    setAuthUser(authUser)

    const [customerName, setCustomerName] = useState('')
    const [customerAddress, setCustomerAddress] = useState('')

    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [products, setProducts] = useState([])

    const [loader, setLoader] = useState(false)

    const [error, setError] = useState(null)
    const showProducts = (event) => {
        event.preventDefault()
        console.log(products)
        productsHandler(products)
    }

    const addItemInProducts = () => {
        if (!title) return setError("Title is required")
        if (!price) return setError("{Price is required")
        if (!quantity) return setError("{Quantity is required")

        const data = {
            title, quantity, price, total: price * quantity
        }
        setProducts([...products, data])
        setTitle('')
        setQuantity('')
        setPrice('')
    }


    const generateInvoice = async (event) => {
        event.preventDefault();

        if (!authUser) return toast.warning("Please login")
        if (!customerName) return setError("Customer full name is required")
        if (!customerAddress) return setError("Customer address is required")

        const invoiceData = {
            customerName, customerAddress, products, auther: authUser ? authUser._id : undefined
        }

        await axios.post("http://localhost:4000/invoice/create", invoiceData).then(() => {
            console.log("Invoice Genrated")
        }).catch((err) => console.error(err.response.data.message))
    }


    return (
        <form className='flex-col flex gap-2 p-2' action="" method='post' id='invoice-form' onSubmit={generateInvoice}>
            <div className="">
                <label htmlFor="fname">Customer Full Name </label>
                <input className='input bg-zinc-100' type="text" name="fname" id="fname" placeholder='Customer full Name...'
                    value={customerName}
                    onChange={(event) => setCustomerName(event.target.value)} />
            </div>
            <div className="">
                <label htmlFor="address">Customer Address </label>
                <textarea className='w-full textarea textarea-bordered resize-none bg-zinc-100' name="address" id="address"
                    placeholder='Customer Address...'
                    value={customerAddress}
                    onChange={(event) => setCustomerAddress(event.target.value)}>
                </textarea>
            </div>
            {/* {
                products.map((item, index) => ( */}
            <div className='flex flex-wrap gap-4 items-end' >
                <div className="sm:w-full md:flex-2 sm:flex-4">
                    <label htmlFor="title">Title</label>
                    <input className='input bg-zinc-100' type="text" name="title" id="title" placeholder='Product title...'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="md:w-1/2 flex-1 sm:flex-shrink">
                    <label htmlFor="price">Price (₹)</label>
                    <input className='input bg-zinc-100' type="tel" name="price" id="price" placeholder='Product price...'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className="md:w-1/2 flex-1">
                    <label htmlFor="qunatity">Quantity</label>
                    <input className='input bg-zinc-100' type="number" name="quantity" id="quantity" placeholder='Product quantity...'
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)} />
                </div>
                <div className='block'>
                    <button className="btn-sm p-0 block text-blue-500 text-md" onClick={showProducts}>
                        Show ({products.length})
                    </button>
                    <button type="button" className='btn bg-blue-500 text-white hover:bg-blue-600 border-0' onClick={addItemInProducts}>
                        Add
                    </button>
                </div>
            </div>
            {
                error && <div className='text-red-500'> {error}</div>
            }
            <div className="text-center mt-4">
                <button type='submit' className="btn bg-blue-600 hover:bg-blue-700 text-white border-0 btn-wide">
                    {
                        loader ?
                            <span>Loading...</span>
                            :
                            <span>  Generate Invoice</span>

                    }
                </button>
            </div>

        </form>
    )
}

export default InvoiceForm