import React, { useState } from 'react'
import axios from "axios"
import { useAuth } from '../context/AuthProvider'
import { toast } from 'react-toastify'

const InvoiceForm = ({ productsHandler }) => {

    const [authUser, setAuthUser] = useAuth()
    setAuthUser(authUser)

    const [customerName, setCustomerName] = useState('')
    const [customerAddress, setCustomerAddress] = useState('')

    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('upi')
    const [products, setProducts] = useState([])

    const [loader, setLoader] = useState(false)

    const [error, setError] = useState(null)

    // payment state
    const [payment, setPayment] = useState({})
    // UPI
    const [upi, setUpi] = useState("")
    const [holderName, setHolderName] = useState("")

    // Credit Card
    const [cardNumber, setCardNumber] = useState("")
    const [expireDate, setExpireDate] = useState()
    const [cvv, setCvv] = useState()

    const showProducts = (event) => {
        event.preventDefault()
        productsHandler(products)
    }

    const addItemInProducts = () => {
        if (!title) return setError("Title is required")
        if (!price) return setError("Price is required")
        if (!quantity) return setError("Quantity is required")

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
        setLoader(true)

        switch (paymentMethod) {
            case "upi":
                setPayment({
                    method: "upi",
                    upi, holderName
                })
                break;

            case "cc":
                setPayment({
                    method: "cc",
                    cardNumber, expireDate, cvv
                })
                break;

            case "cash":
                setPayment({ method: "cash" })
                break;

            case "emi": break;
        }
        const invoiceData = {
            customerName, customerAddress, products, auther: authUser ? authUser._id : undefined, payment
        }
        await axios.post("http://localhost:4000/invoice/create", invoiceData).then((res) => {
            console.log(res)
            toast.success(res.data.message)
            setLoader(false)
            localStorage.setItem("invoice", JSON.parse(res.data.invoice))
        }).catch((err) => console.error(err.response.data.message))

        setCustomerName("")
        setCustomerAddress("")
        setProducts([])
        setLoader(false)
    }


    const PaymentMethodHandler = ({ method }) => {

        setError(null)
        if (method === 'upi')
            return (
                <div className='flex flex-wrap gap-4'>
                    <div className="flex-1 w-1/2">
                        <label htmlFor="upi">Enter UPI</label>
                        <input className='input input-sm bg-zinc-100' type="text" name="upi" id="upi" placeholder='UPI...'
                            value={upi}
                            onChange={(e) => setUpi(e.target.value)}
                        />
                    </div>
                    <div className="flex-1 w-1/2">
                        <label htmlFor="holderName">Holder Name</label>
                        <input className='input input-sm bg-zinc-100' type="text" name="holderName" id="holderName" placeholder='Account Holder Name...'
                            value={holderName}
                            onChange={(e) => setHolderName(e.target.value)}
                        />
                    </div>
                </div>
            )

        if (method === "cc") return (
            <div className='flex flex-wrap gap-4'>
                <div className="md:w-1/2 flex-1">
                    <label htmlFor="upi">Card Number</label>
                    <input className='input input-sm bg-zinc-100' type="text" name="upi" id="upi" placeholder='UPI...'
                        value={cardNumber}
                        onChange={(event) => setCardNumber(event.target.value)} />
                </div>
                <div className="md:w-1/4 flex-1">
                    <label htmlFor="expire">Expire Date</label>
                    <div className='flex'>
                        <input className='input input-sm bg-zinc-100' type="month" name="mm" id="expire" placeholder='Expire Date...'
                            value={expireDate}
                            onChange={(e) => setExpireDate(e.target.value)}
                        />
                    </div>
                </div>
                <div className="md:w-1/4 flex-1">
                    <label htmlFor="cvv">Card CVV</label>
                    <input className='input input-sm bg-zinc-100' type="text" name="cvv" id="cvv" placeholder='cvv...'
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                    />
                </div>
            </div>

        )

        if (method === "emi") return (
            setError("Currently EMI service not available")
        )
    }

    return (
        <form className='flex-col flex gap-2 p-2 ' action="" method='post' id='invoice-form' onSubmit={generateInvoice}>
            <div className="">
                <label htmlFor="fname">Customer Full Name </label>
                <input className='input input-sm bg-zinc-100' type="text" name="fname" id="fname" placeholder='Customer full Name...'
                    value={customerName}
                    onChange={(event) => setCustomerName(event.target.value)} />
            </div>
            <div className="">
                <label htmlFor="address">Customer Address </label>
                <textarea className='w-full textarea  textarea-sm textarea-bordered resize-none bg-zinc-100' name="address" id="address"
                    placeholder='Customer Address...'
                    value={customerAddress}
                    onChange={(event) => setCustomerAddress(event.target.value)}>
                </textarea>
            </div>

            <div className='flex flex-wrap gap-4 items-end' >
                <div className="sm:w-full md:flex-2 ">
                    <label htmlFor="title">Title</label>
                    <input className='input input-sm bg-zinc-100' type="text" name="title" id="title" placeholder='Product title...'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="md:w-1/2 flex-1">
                    <label htmlFor="price">Price <b>(₹)</b></label>
                    <input className='input input-sm bg-zinc-100' type="number" name="price" id="price" placeholder='Product price...'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className="md:w-1/2 flex-1">
                    <label htmlFor="qunatity">Quantity</label>
                    <input className='input input-sm bg-zinc-100' type="number" name="quantity" id="quantity" placeholder='Product quantity...'
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)} />
                </div>
                <div className='block'>
                    <button className="btn-sm p-0 block text-blue-500 text-md" onClick={showProducts}>
                        Show ({products.length})
                    </button>
                    <button type="button" className='btn btn-sm bg-blue-500 text-white hover:bg-blue-600 border-0' onClick={addItemInProducts}>
                        Add
                    </button>
                </div>
            </div>

            <div className='flex flex-wrap gap-4'>
                <div className='flex-1 md:w-fit'>
                    <label className="whitespace-nowrap" htmlFor="payment">Payment Method</label>
                    <select className='select select-sm bg-zinc-100 select-bordered w-full' name="payment" id="payment" defaultValue={paymentMethod} onChange={(e) => setPaymentMethod(e.currentTarget.value)}>
                        <option value="upi">UPI</option>
                        <option value="cc">Credit Card</option>
                        <option value="cash">Cash</option>
                        <option value="emi">EMI</option>
                    </select>
                </div>
                <PaymentMethodHandler method={paymentMethod} />

            </div>
            {
                error && <div className='text-red-500'> {error}</div>
            }
            <div className="text-center mt-4">
                <button type='submit' className="btn bg-blue-600 hover:bg-blue-700 text-white border-0 btn-wide text-center">
                    {
                        loader
                            ?
                            <span className="loading loading-bars loading-sm"></span>
                            :
                            <span>Generate Invoice</span>
                    }
                </button>
            </div>

        </form>
    )
}

export default InvoiceForm