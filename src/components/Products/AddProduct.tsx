import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
interface foo{
  id: string;
  name: string;
}
const AddProduct = () => {
  
  // const [id, setId] = useState('');
  const navigate = useNavigate();
  const [Name, setName] = useState<string>("");
  const [Price, setPrice] = useState<string>("");
  const [Category, setCategory] = useState<string>("");
  const [Image, setImage] = useState<string>("");
  const [categories, setCategories] = useState<foo[]>([]);

  useEffect(() => {
    async function fetchDataCategories() {
      const response = await fetch(
        "https://react-http-8f78d-default-rtdb.firebaseio.com/ecommerce/categories.json"
      );
      const data = await response.json();
      const DATA = [];
      for (const key in data) {
        DATA.push({
          id: key,
          name: data[key],
        });
      }
      setCategories(DATA);
    }
    fetchDataCategories();
},[])
  const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
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
  const handleSubmit = (event: React.FormEvent) => {
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
     // props.setCatButton(false);
      navigate(-1)
    });
  };
  const handleChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value)
  }
  return (
    <React.Fragment>
      <h2>Add product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="Category">Category:</label>
          <select onChange={handleChange}>
            <option value="All">All</option>
            {categories.map((option) => (
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
