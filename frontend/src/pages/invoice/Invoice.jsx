import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthProvider'
import axios from 'axios'

const Invoice = () => {

    const [invoices, setInvoices] = useState([]);
    const [authUser, setAuthUser] = useAuth();

    useEffect(() => {
        const getInvoices = async () => {
            await axios.get("http://localhost:4000/invoice").then((res) => {
                setInvoices(res.data)
                console.log(res.data)
            }).catch((err) => console.log(err.response.data.message))

            const filter = invoices.filter((elem) => elem.auther === authUser._id)
            setInvoices(filter)
        }
        getInvoices()
    }, [])


    console.log(authUser)
    console.log(invoices)

    return (
        <section className='md:px-24 sm:px-4'>
            <div className=''>
                <h4 className='text-2xl font-bold p-3'>
                    Account
                </h4>
                <div className='text-lg md:px-8 md:flex justify-between font-semibold p-3 rounded-md bg-blue-100'>
                    <h5>{authUser.fullName}</h5>
                    <h5>{authUser.email}</h5>
                </div>

                <h4 className='text-2xl font-bold p-3'>
                    My Invoices
                </h4>
                <table className="table rounded-md bg-blue-100">
                    {/* head */}
                    <thead>
                        <tr className='bg-blue-200 text-md text-zinc-500'>
                            <th></th>
                            <th>Customer Name</th>
                            <th>Customer Address</th>
                            <th>Date</th>
                            <th>Invoice</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            authUser.invoices.map((elem) => (
                                <tr className='hover:bg-blue-300'>
                                    <th>#6541</th>
                                    <td>Cy Ganderton</td>
                                    <td>Quality Control Specialist</td>
                                    <td>Blue</td>
                                    <td><button className="btn btn-sm btn-ghost h-auto p-0">show</button></td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </section >
    )
}

export default Invoice