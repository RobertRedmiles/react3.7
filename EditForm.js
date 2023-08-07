function EditForm({selectedProduct, handlerUpdateProductForm, cancelForm}) {

    const handlerSubmitForm = (e) => {
        e.preventDefault();

        const updatedTotal = e.target.quantity.value * e.target.price.value * ((100 - e.target.discount.value)/100)

        const updatedProduct = {
            id: e.target.id.value,
            name: e.target.name.value,
            quantity: e.target.quantity.value,
            price: e.target.price.value,
            discount: e.target.discount.value,
            total: updatedTotal

        }

        handlerUpdateProductForm(updatedProduct)
    }

    return (
        <>
            <form onSubmit={handlerSubmitForm}>
                <input type="hidden" id="id" defaultValue={selectedProduct.id} />

                <label htmlFor="name">Name</label>
                <input id="name" defaultValue={selectedProduct.name} />

                <label htmlFor="quantity">Quantity</label>
                <input id="quantity" defaultValue={selectedProduct.quantity} />

                <label htmlFor="price">Price</label>
                <input id="price"defaultValue={selectedProduct.price} />

                <label htmlFor="discount">Discount</label>
                <input id="discount" defaultValue={selectedProduct.discount} />

                <button type='Submit'>Submit</button> 

                <button type="submit">Submit</button>
                <button type="button" onClick={cancelForm}>Cancel</button>
            </form>

            
        </>
    )
}

export default EditForm;