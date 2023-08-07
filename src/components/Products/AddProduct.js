import React, { useState } from "react";

const AddProduct = (props) => {
  // const [id, setId] = useState('');
  const [Name, setName] = useState("");
  const [Price, setPrice] = useState("");
  const [Category, setCategory] = useState("");
  const [Image, setImage] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "Name") {
      setName(value);
    } else if (name === "Price") {
      setPrice(value);
    // } else if (name === "Category") {
    //   setCategory(value);
    } else if (name === "Image") {
      setImage(value);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(
      "https://react-http-8f78d-default-rtdb.firebaseio.com/ecommerce/products.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: Name,
          price: Price,
          category: Category,
          image: Image,
        }),
      }
    ).then(() => {
      setName("");
      setCategory("");
      setPrice("");
      setImage("");
      props.setCatButton(false);
    });
  };
  const handleChange = (event) => {
    setCategory(event.target.value)
  }
  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="Category">Category:</label>
          <select onChange={handleChange}>
            <option value="All">All</option>
            {props.categories.map((option) => (
              <option key={option.name} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>
          {/* <input
                         type="text"
                         id="Category"
                         name="Category"
                         value={Category}
                         onChange={handleInputChange}
                         required
                     /> */}
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
          <label htmlFor="Name">Product Price:</label>
          <input
            type="text"
            id="Price"
            name="Price"
            value={Price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="Image">Product Image:</label>
          <input
            type="text"
            id="Image"
            name="Image"
            value={Image}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default AddProduct;
