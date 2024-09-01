import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';

const PreviewPage = ({ reference }) => {
    const [color, setColor] = useState('blue');

    // const color = 'blue'

    return (
        <section ref={reference} className={`max-w-[210mm] mx-auto  flex flex-col justify-between bg-${color}-50  text-zinc-600 font-semibold border-2 shadow-lg`}>

            <div className={`flex flex-col h-50 bg-${color}-100`}>
                <div className='h-full px-10 pt-8 grid grid-cols-2'>
                    <span className='text-2xl uppercase font-bold text-zinc-500'>
                        Invoice HUb
                    </span>
                    <span className={`text-5xl font-bold text-center uppercase text-${color}-800 pb-6`}>Invoice</span>
                </div>
                <div className="grid grid-cols-2">
                    <span className={`text-xl uppercase p-3 ps-12 text-white bg-${color}-500 rounded-e-full shadow-xl`}>
                        Invoice <span className='text-blue-400 font-bold'>#1000</span>
                    </span>
                    <span className="p-3 text-md text-zinc-600 font-normal text-center">
                        <b className='text-lg pe-6'>Date :-  </b> 31 / 12 / 2024
                    </span>
                </div>
            </div>

            <div className="flex flex-col justify-between h-full bg-transparent px-12">

                <div className='grid grid-cols-2 py-5'>
                    <div className="flex">
                        <div className='w-[200px] text-xl font-bold'>
                            Invoice to :
                        </div>

                        <div>
                            <h5 className='text-lg font-bold'>
                                Radhe Radhe
                            </h5>
                            <address className='text-sm'>
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere, deleniti.
                            </address>
                        </div>
                    </div>
                </div>

                {/* <div className="overflow-x-auto"> */}
                <table className="table">
                    <thead>
                        <tr className='text-zinc-400 border-b-2 border-gray-500 '>
                            <th className={`bg-${color}-500`}></th>
                            <th className={`bg-${color}-500 text-zinc-200`}>Item Description</th>
                            <th className={`bg-${color}-500 rounded-e-full text-zinc-200`}>Price</th>
                            <th>Qty.</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <th>Cy Ganderton</th>
                            <td>2566</td>
                            <td>1</td>
                            <td>2566</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <th>Cy Ganderton</th>
                            <td>2566</td>
                            <td>1</td>
                            <td>2566</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <th>Cy Ganderton</th>
                            <td>2566</td>
                            <td>1</td>
                            <td>2566</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <th>Cy Ganderton</th>
                            <td>2566</td>
                            <td>1</td>
                            <td>2566</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <th>Cy Ganderton</th>
                            <td>2566</td>
                            <td>1</td>
                            <td>2566</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <th>Cy Ganderton</th>
                            <td>2566</td>
                            <td>1</td>
                            <td>2566</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <th>Cy Ganderton</th>
                            <td>2566</td>
                            <td>1</td>
                            <td>2566</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <th>Cy Ganderton</th>
                            <td>2566</td>
                            <td>1</td>
                            <td>2566</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <th>Cy Ganderton</th>
                            <td>2566</td>
                            <td>1</td>
                            <td>2566</td>
                        </tr>

                    </tbody>
                </table>
                {/* </div> */}


                <div className='grid grid-cols-2 mb-6'>
                    <div className="flex flex-col">
                        <div className='py-3'>
                            <h5 className='text-lg font-bold'>Payment Info,</h5>
                            <table className="table table-xs">
                                <tr>
                                    <th>Account : </th>
                                    <td>
                                        123 12345 456789
                                    </td>
                                </tr>
                                <tr>
                                    <th>A/C Name : </th>
                                    <td>
                                        Shatyau Akare
                                    </td>
                                </tr>
                                <tr>
                                    <th>Bank Details : </th>
                                    <td>
                                        Add your bank Details
                                    </td>
                                </tr>
                            </table>
                        </div>

                        <div>
                            <h5 className='text-lg font-bold'>Term & Conditions</h5>
                            <p className='text-sm text-zinc-500'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore quod, esse quisquam excepturi amet impedit.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between mt-3">
                        <table className="table w-2/3 ms-auto table-xs p-2 ">
                            <tr>
                                <th>Sub Total :- </th>
                                <td>₹2568</td>
                            </tr>
                            <tr>
                                <th>Tax :- </th>
                                <td>0.00%</td>
                            </tr>
                            <tr className='text-white  leading-8'>
                                <th className={`bg-${color}-500 rounded-s-full ps-6`}>Total : </th>
                                <th className={`bg-${color}-500`}>₹354984 </th>
                            </tr>
                        </table>

                        <div className='text-end'>
                            <span className='border-t-2 border-gray-600 w-1/2 px-10 text-xl p-2 me-7'>
                                Authorised Sign
                            </span>
                        </div>

                    </div>
                </div>
            </div>

            <div className={`grid grid-cols-2 bg-transparent`}>
                <span className="p-3 text-lg text-zinc-600 font-bold text-center">
                    Welcome
                </span>
                <span className={`text-lg uppercase p-3 ps-12 text-white bg-${color}-500 rounded-s-full shadow-xl`}>
                    Thank you for Visiting Shop
                </span>

            </div>
        </section>
    )
}

export default PreviewPage