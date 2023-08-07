import React, {useEffect, useState} from "react";

const UpdateCategory = (props) =>{
    const [Name, setName] = useState('');
    useEffect(()=>{
        console.log(props.catName,props.catId)
        setName(props.catName)
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
        fetch(`https://react-http-8f78d-default-rtdb.firebaseio.com/ecommerce/categories/${props.catId}.json`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(Name),
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