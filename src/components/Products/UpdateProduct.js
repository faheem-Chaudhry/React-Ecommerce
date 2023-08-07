import React, {useState, useEffect} from "react";

const UpdateProduct = (props) =>{
    const [Name, setName] = useState('');
    const [Price, setPrice] = useState('');
    useEffect(()=>{
        console.log(props.catName,props.catId)
        setName(props.catName)
        setPrice(props.catPrice)
    },[])
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'Price') {
            setPrice(value);
        } else if (name === 'Name') {
            setName(value);
        }
    };
    const handleSubmit = (event) =>{
        event.preventDefault();
        fetch(`https://react-http-8f78d-default-rtdb.firebaseio.com/ecommerce/products/${props.catId}.json`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({name:Name, price: Price, image: props.catImage, category: props.catCategory}),
          }).then(()=>{
            setName('');
            props.updateState(false);
          })
    }
    return(
        <React.Fragment>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="id">ID:</label>
                <input
                    type="text"
                    id="id"
                    name="id"
                    value={props.catId}
                    onChange={handleInputChange}
                    readOnly
                />
            </div>
            <div>
                <label htmlFor="Name">Product Name:</label>
                <input
                    type="text"
                    id="Name"
                    name="Name"
                    value={Name}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="Price">Product Price:</label>
                <input
                    type="Text"
                    id="Price"
                    name="Price"
                    value={Price}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <button type="submit">Update</button>
            </div>
        </form>
    </React.Fragment>
    )
}

export default UpdateProduct