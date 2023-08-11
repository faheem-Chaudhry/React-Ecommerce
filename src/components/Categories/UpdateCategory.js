import React, {useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateCategory = (props) =>{
    const navigate = useNavigate();
    const {cate_id} = useParams();
    const [Name, setName] = useState('');
    useEffect(()=>{
        async function fetchData() {
            const response = await fetch(
              "https://react-http-8f78d-default-rtdb.firebaseio.com/ecommerce/categories.json"
            );
            const data = await response.json();
            
            
            for (const key in data) {
              if (key === cate_id) {
                setName(data[key])
              }
            }
            
          }
          fetchData();
        //console.log(props.catName,props.catId)
        //setName(props.catName)
    },[])
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
        fetch(`https://react-http-8f78d-default-rtdb.firebaseio.com/ecommerce/categories/${cate_id}.json`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(Name),
          }).then(()=>{
            setName('');
            //props.updateState(false);
            navigate(-1)
          })
    }
    return(
        <React.Fragment>
            <h2>Update Category</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="id">ID:</label>
                <input
                    type="text"
                    id="id"
                    name="id"
                    value={cate_id}
                    onChange={handleInputChange}
                    readOnly
                />
            </div>
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
                <button type="submit">Update</button>
            </div>
        </form>
    </React.Fragment>
    )
}

export default UpdateCategory