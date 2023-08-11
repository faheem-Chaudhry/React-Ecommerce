import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCategories = (props) => {
    const navigate = useNavigate();
    // const [id, setId] = useState('');
    const [Name, setName] = useState('');
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'id') {
        //    setId(value);
        } else if (name === 'Name') {
            setName(value);
        }
    };
    const handleSubmit = (event) =>{
        event.preventDefault();
        fetch('https://react-http-8f78d-default-rtdb.firebaseio.com/ecommerce/categories.json', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(Name),
          }).then(()=>{
            setName('');
            navigate(-1)
          //  props.setCatButton(false);
          })
    }
    return (
        <React.Fragment>
            <h2>Add category</h2>
            <form onSubmit={handleSubmit}>
                {/* <div>
                    <label htmlFor="id">Username:</label>
                    <input
                        type="text"
                        id="id"
                        name="id"
                        value={id}
                        onChange={handleInputChange}
                        required
                    />
                </div> */}
                <div>
                    <label htmlFor="Name">Category Name:</label>
                    <input
                        type="Name"
                        id="Name"
                        name="Name"
                        value={Name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <button type="submit">Add</button>
                </div>
            </form>
        </React.Fragment>
    )
}

export default AddCategories