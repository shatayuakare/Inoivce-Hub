import React from 'react'

const PreviewPage = ({ reference, theme, invoice }) => {
    let totalAmount = 0;
    const gst = 5.0;
    const color = theme;

    const [year, month, day] = invoice.date.slice(0, 10).split('-');
    console.log(invoice)


    return (
        <section ref={reference} className={`w-[210mm] mx-auto min-h-[297mm] h-[297mm] border-2 border-gray-300 flex flex-col justify-between bg-${color}-50 text-zinc-600 font-semibold border-2 shadow-lg`}>
            <div className={`flex flex-col h-50 bg-${color}-200`}>
                <div className='h-full px-10 pt-8 grid grid-cols-2'>
                    <span className='text-2xl uppercase font-bold text-zinc-500'>
                        Invoice HUb
                    </span>
                    <span className={`text-5xl font-bold text-center uppercase text-${color}-800 pb-6`}>Invoice</span>
                </div>
                <div className="grid grid-cols-2">
                    <span className={`text-xl uppercase p-3 ps-12 text-white bg-${color}-500 rounded-e-full shadow-xl`}>
                        Invoice <span className={`text-${color}-200 font-bold`}>#{(invoice.series <= 9) ? "100" + invoice.series : (invoice.series <= 99) ? "10" + invoice.series : (invoice.series <= 999) ? "1" + invoice.series : (invoice.series > 999) ? invoice.series : undefined}</span>
                    </span>
                    <span className="p-3 text-md text-zinc-600 font-normal text-center">
                        <b className='text-lg pe-6'>Date :-  </b> {day} / {month} / {year}
                    </span>
                </div>
            </div>

            <div className="flex flex-col justify-between h-full bg-transparent px-12">

                <div className='block py-3'>
                    <div className="flex w-1/2 p-5">
                        <div className='w-1/2 text-xl font-bold'>
                            Invoice to :
                        </div>

                        <div>
                            <h5 className='text-lg font-bold'>
                                {invoice.customerName}
                            </h5>
                            <address className='text-md font-mono'>
                                {invoice.customerAddress}
                            </address>
                        </div>
                    </div>

                    <table className="table block">
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
                            {
                                invoice.products.map((elem, i) => {
                                    totalAmount += elem.total
                                    return (
                                        <tr key={elem._id}>
                                            <td>{i + 1}</td>
                                            <th>{elem.title}</th>
                                            <td>{elem.price}</td>
                                            <td>{elem.quantity}</td>
                                            <td>{elem.total}</td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>
                <div className='grid grid-cols-2 mb-6'>
                    <div className="flex flex-col">
                        <div className='py-3'>
                            <h5 className='text-lg font-bold'>Payment Info,</h5>
                            <table className="table table-xs">

                                {
                                    (invoice.payment.method === "cc") ?
                                        <tbody>
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
                                        </tbody>
                                        :
                                        (invoice.payment.method == "upi") ?
                                            <tbody>
                                                <tr>
                                                    <th>Holder Name : </th>
                                                    <td>
                                                        {invoice.payment.holderName}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>UPI : </th>
                                                    <tr>
                                                        {invoice.payment.upi}
                                                    </tr>
                                                </tr>
                                            </tbody>
                                            :
                                            (invoice.payment.method === "cash") ?
                                                <tbody>
                                                    <tr>
                                                        <th>Name : </th>
                                                        <td>{invoice.customerName}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Amount : </th>
                                                        <td>
                                                            {totalAmount}
                                                        </td>
                                                    </tr>
                                                </tbody> :
                                                (invoice.payment.method === "emi") ? <tbody>

                                                </tbody>
                                                    :
                                                    undefined
                                }
                            </table>
                        </div>

                        <div>
                            <h5 className='text-lg font-bold'>Term & Conditions</h5>
                            <p className='text-sm text-zinc-500'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore quod, esse quisquam excepturi amet impedit.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between gap-16">
                        <table className="table w-2/3 ms-auto table-xs text-xl">
                            <tbody>
                                <tr>
                                    <th>Sub Total :- </th>
                                    <td >₹{totalAmount}</td>
                                </tr>
                                <tr>
                                    <th>GST :- </th>
                                    <td>{gst}%</td>
                                </tr>
                                <tr className='text-white leading-8'>
                                    <th className={`bg-${color}-500 rounded-s-full ps-6`}>Total : </th>
                                    <th className={`bg-${color}-500 text-2xl`}>₹{((totalAmount * gst) / 100) + totalAmount} </th>
                                </tr>
                            </tbody>
                        </table>

                        <div className='text-end'>
                            <span className='border-t-2 border-gray-600 w-1/2 px-10 text-md  me-7'>
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