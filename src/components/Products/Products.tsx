import React, { useEffect, useState } from "react";
import AddProduct from "./AddProduct";
import UpdateProduct from "./UpdateProduct";
import { Outlet, useNavigate, } from "react-router-dom";

interface foo{
  id: string;
  name: string;
}
interface prod{
  id:string,
  name: string,
  price: string,
  image: string,
  category: string
}

const Products = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<foo[]>([]);
  const [products, setProducts] = useState<prod[]>([]);
  const [cateButton, setcateButton] = useState(false);
  const [updateCategories, setupdateCategories] = useState(false);
  // const [updateItem, setUpdateItem] = useState({
  //   id: "",
  //   name: "",
  //   price: "",
  //   image: "",
  //   category: "",
  // });
  const [isdelete, setIsDelete] = useState(false);
  const [sureDelete, setSureDelete] = useState(false);
  const [sureDelete2, setSureDelete2] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  useEffect(() => {
    async function fetchDataCategories() {
      setIsDelete(false);
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

    //-----------------------------------Products-------------------------------

    async function fetchData() {
      setIsDelete(false);
      const response = await fetch(
        "https://react-http-8f78d-default-rtdb.firebaseio.com/ecommerce/products.json"
      );
      const data = await response.json();
      const DATA = [];
      for (const key in data) {
        DATA.push({
          id: key,
          name: data[key].name,
          image: data[key].image,
          price: data[key].price,
          category: data[key].category,
        });
      }
      setProducts(DATA);
    }
    fetchData();
  }, [cateButton, updateCategories, isdelete]);
  const addCategoriesHandler = () => {
    setcateButton(true);
    navigate('add')
  };
  const handleDelete = (catId: string) => {
    setSureDelete(true);
    setDeleteId(catId);
    // if (sureDelete2 === true) {
    //   fetch(
    //     `https://react-http-8f78d-default-rtdb.firebaseio.com/ecommerce/products/${catId}.json`,
    //     {
    //       method: "DELETE",
    //     }
    //   ).then(() => setIsDelete(true));
    //   setSureDelete2(false);
    //   setSureDelete(false)
    // }
    // else{
    //  //   setSureDelete(false);
    // }
  };
  const handleUpdate = (id: string) => {
    console.log("update", id);
    // setUpdateItem({
    //   id: id,
    //   name: name,
    //   price: price,
    //   image: image,
    //   category: category,
    // });
   // setupdateCategories(true);
    navigate(`update/${id}`)
  };

  const handleChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
    async function fetchData() {
      setIsDelete(false);
      const response = await fetch(
        "https://react-http-8f78d-default-rtdb.firebaseio.com/ecommerce/products.json"
      );
      const data = await response.json();
      const DATA = [];
      if (event.target.value === "All") {
        for (const key in data) {
          DATA.push({
            id: key,
            name: data[key].name,
            image: data[key].image,
            price: data[key].price,
            category: data[key].category,
          });
        }
      }
      for (const key in data) {
        if (data[key].category === event.target.value) {
          DATA.push({
            id: key,
            name: data[key].name,
            image: data[key].image,
            price: data[key].price,
            category: data[key].category,
          });
        }
      }
      setProducts(DATA);
    }
    fetchData();
  };
  const sureDeleteHandler = () => {
    fetch(
      `https://react-http-8f78d-default-rtdb.firebaseio.com/ecommerce/products/${deleteId}.json`,
      {
        method: "DELETE",
      }
    ).then(() => setIsDelete(true));
   // setSureDelete2(false);
    setSureDelete(false)
 //   setSureDelete2(true);
    
  };
  const cancelDeleteHandler = () => {
  //  setSureDelete2(false);
    setSureDelete(false)
  };
  return (
    <React.Fragment>
      <h2>Products list</h2>
         {sureDelete && (
                  <div>
                    <p>Are you sure to want to delete</p>
                    <button onClick={sureDeleteHandler}>yes</button>
                    <button onClick={cancelDeleteHandler}>no</button>
                  </div>
                )}
      {/* {cateButton && <AddProduct categories={categories} setCatButton={setcateButton} />} */}
      <select onChange={handleChange}>
        <option value="All">All</option>
        {categories.map((option) => (
          <option key={option.name} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
      <table>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Category</th>
          <th>Image</th>
          <th>delete</th>
          <th>update</th>
        </tr>
        <tbody>
          {products.map((cat) => {
            return (
              <tr>
                <td>{cat.name}</td>
                <td>{cat.price}</td>
                <td>{cat.category}</td>
                <td>
                  <img height="100px" width="200px" src={cat.image} />
                </td>
                <td>
                  <button onClick={() => handleDelete(cat.id)}>Delete</button>
                </td>
               
                <td>
                  <button
                    onClick={() =>
                      handleUpdate(cat.id)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={addCategoriesHandler}>Add Products</button>
      {/* {updateCategories && (
        <UpdateProduct
          catId={updateItem.id}
          catName={updateItem.name}
          catPrice={updateItem.price}
          catImage={updateItem.image}
          catCategory={updateItem.category}
          updateState={setupdateCategories}
        />
      )} */}
      <Outlet/>
    </React.Fragment>
  );
};

export default Products;
