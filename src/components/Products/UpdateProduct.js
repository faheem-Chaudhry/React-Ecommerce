import React, {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = (props) =>{
    const navigate = useNavigate();
    const {prod_id} = useParams();
    const [Name, setName] = useState('');
    const [Price, setPrice] = useState('');
    const [Image, setImage] = useState('')
    const [Category, setCategory] = useState('')
    useEffect(()=>{
        async function fetchData() {
            const response = await fetch(
              "https://react-http-8f78d-default-rtdb.firebaseio.com/ecommerce/products.json"
            );
            const data = await response.json();
            
            
            for (const key in data) {
              if (key === prod_id) {
                setName(data[key].name)
                setPrice(data[key].price)
                setCategory(data[key].category)
                setImage(data[key].image)
              }
            }
            
          }
          fetchData();
        console.log(props.catName,props.catId)
        // setName(props.catName)
        // setPrice(props.catPrice)
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
        fetch(`https://react-http-8f78d-default-rtdb.firebaseio.com/ecommerce/products/${prod_id}.json`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({name:Name, price: Price, image: Image, category: Category}),
          }).then(()=>{
            setName('');
            setPrice('')
            setImage('')
            setCategory('')
            navigate(-1)
            //props.updateState(false);
          })
    }
    return(
        <React.Fragment>
        <form onSubmit={handleSubmit}>
            <h2>Update Product</h2>
            <div>
                <label htmlFor="id">ID:</label>
                <input
                    type="text"
                    id="id"
                    name="id"
                    value={prod_id}
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