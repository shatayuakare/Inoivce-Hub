import React, { useRef, useState } from 'react'
import PreviewPage from '../../components/PreviewPage'
import { useReactToPrint } from 'react-to-print';



const Preview = () => {

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        beforePrint: ((pdf) => {
            pdf.name = `Invoice-${new Date().getTime()}.pdf`;
            pdf.title = 'Invoice';
            pdf.author = 'Shatayu Akare'
        })
    });
    const [color, setColor] = useState('blue');

    const [invoice, setInvoice] = useState(JSON.parse(localStorage.getItem('invoice')))

    const colors = ['blue', 'red', 'orange', 'green', 'lime', 'purple']


    return (
        <section className="">
            <div className="md:fixed md:right-0 rounded-xl shadow-lg bg-blue-200 px-4 py-2 md:top-2/4 sm:mb-2">
                <h4 className='text-xl font-bold'>Select Color</h4>
                <div className='grid md:grid-cols-3 sm:grid-cols-6 gap-2 mt-2'>
                    {
                        colors.map((elem, index) => (
                            <button key={index} className={`bg-${elem}-500 md:h-12 sm:h-8 md:w-12 sm:w-8  rounded-full border-1 border-2 border-transparent focus:border-gray-400 hover:border-zinc-700`}
                                onClick={() => setColor(elem)}
                            >
                            </button>
                        ))
                    }
                </div>
            </div>

            <PreviewPage reference={componentRef} theme={color} invoice={invoice} method="cc" />

            <div className='text-center my-4'>
                <button className="btn bg-green-500 text-white hover:bg-green-600" onClick={handlePrint}>Print</button>
            </div>
        </section >
    )
}

export default Preview