import React, { useState } from 'react';

const InvoiceGenerator = () => {
    const [invoice, setInvoice] = useState({
        customer: '',
        date: '',
        items: []
    });

    const handleInputChange = (event) => {
        setInvoice({ ...invoice, [event.target.name]: event.target.value });
    };

    const handleAddItem = () => {
        setInvoice({ ...invoice, items: [...invoice.items, { name: '', quantity: '', price: '' }] });
    };

    const handleRemoveItem = (index) => {
        setInvoice({ ...invoice, items: invoice.items.filter((item, i) => i !== index) });
    };

    const calculateTotal = () => {
        return invoice.items.reduce((acc, item) => acc + (item.quantity * item.price), 0);
    };

    const generateInvoice = () => {
        const formattedItems = invoice.items.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            total: item.quantity * item.price
        }));

        const formattedInvoice = {
            customer: invoice.customer,
            date: new Date(invoice.date).toLocaleDateString(),
            items: formattedItems,
            total: calculateTotal()
        };

        console.log(formattedInvoice);
        // You can use this formatted invoice data to generate a PDF or print the invoice
    };

    return (
        <div>
            <h2>Invoice Generator</h2>
            <form>
                <label>
                    Customer:
                    <input type="text" name="customer" value={invoice.customer} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    Date:
                    <input type="date" name="date" value={invoice.date} onChange={handleInputChange} />
                </label>
                <br />
                {invoice.items.map((item, index) => (
                    <div key={index}>
                        <label>
                            Item {index + 1}:
                            <input type="text" name={`item-${index}-name`} value={item.name} onChange={(event) => handleInputChange(event)} />
                        </label>
                        <br />
                        <label>
                            Quantity:
                            <input type="number" name={`item-${index}-quantity`} value={item.quantity} onChange={(event) => handleInputChange(event)} />
                        </label>
                        <br />
                        <label>
                            Price:
                            <input type="number" name={`item-${index}-price`} value={item.price} onChange={(event) => handleInputChange(event)} />
                        </label>
                        <br />
                        <button type="button" onClick={() => handleRemoveItem(index)}>Remove Item</button>
                    </div>
                ))}
                <button type="button" onClick={handleAddItem}>Add Item</button>
                <br />
                <button type="button" onClick={generateInvoice}>Generate Invoice</button>
            </form>
        </div>
    )
}

export default InvoiceGenerator;