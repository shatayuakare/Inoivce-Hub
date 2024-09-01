import React, { useRef, useState } from 'react'
import PreviewPage from '../../components/PreviewPage'
import { useReactToPrint, PrintLink, getElementById } from 'react-to-print';
const Preview = () => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "Invoice"
    });

    const [color, setColor] = useState();
    const [index, setIndex] = useState();

    const colors = ['blue', 'red', 'green', 'voilet', 'gray', 'purple']


    return (
        <section className="pt-20">
            <div className="md:fixed md:right-0 rounded-xl shadow-lg bg-blue-200 px-4 py-2 md:top-2/4">
                <h4 className='text-xl font-bold'>Select Color</h4>
                <div className='grid grid-cols-3 gap-2 mt-2'>
                    {
                        colors.map((elem, index) => (
                            <div key={index} className={`h-12 w-12 bg-${elem}-500 rounded-full border-1 border-2 border-transparent focus:border-gray-400 hover:border-zinc-700`}>

                            </div>
                        ))
                    }
                </div>
            </div>

            <PreviewPage reference={componentRef} />

            <div className='text-center my-4'>
                <button className="btn bg-green-500 text-white hover:bg-green-600" onClick={handlePrint}>Print</button>
            </div>
        </section >
    )
}

export default Preview