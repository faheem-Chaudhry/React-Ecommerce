import React, { useEffect, useState } from "react";
import AddCategories from "./AddCategories";
import UpdateCategory from "./UpdateCategory";

const Categories = (props) => {
    const [categories, setCategories] = useState([]);
    const [cateButton, setcateButton] = useState(false)
     const [updateCategories, setupdateCategories] = useState(false)
     const [updateItem, setUpdateItem] = useState({id:'',name:''});
     const [isdelete, setIsDelete] = useState(false)
     const [sureDelete, setSureDelete] = useState(false);
     const [deleteId, setDeleteId] = useState('')
    useEffect(() => {
        async function fetchData() {
            setIsDelete(false)
            const response = await fetch('https://react-http-8f78d-default-rtdb.firebaseio.com/ecommerce/categories.json');
            const data = await response.json();
            const DATA = [];
            for (const key in data) {
                DATA.push({
                    id: key,
                    name: data[key]

                })
            }
            setCategories(DATA);


        }
        fetchData()
    }, [cateButton,updateCategories, isdelete])
    const addCategoriesHandler = () => {
        setcateButton(true)
    }
    const handleDelete = (catId) => {
        setSureDelete(true);
        setDeleteId(catId);
        // fetch(`https://react-http-8f78d-default-rtdb.firebaseio.com/ecommerce/categories/${catId}.json`, {
        //     method: 'DELETE',
        // }).then(() => setIsDelete(true));
        // .then((data) => {
        //   console.log('Product deleted successfully:', data);
        //   // Update the product list after successful deletion
        //   setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
        // })
        // .catch((error) => {
        //   console.error('Error deleting product:', error);
        // });
    }
    const handleUpdate = (id, name) => {
        console.log('update',id,name)
        setUpdateItem({id:id,name:name})
        setupdateCategories(true)
    //    return ( updateCategories && <UpdateCategory catId={id} catName={name} /> )
    }
    const sureDeleteHandler = () => {
        fetch(
          `https://react-http-8f78d-default-rtdb.firebaseio.com/ecommerce/categories/${deleteId}.json`,
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
            {sureDelete && (
                  <div>
                    <p>Are you sure to want to delete</p>
                    <button onClick={sureDeleteHandler}>yes</button>
                    <button onClick={cancelDeleteHandler}>no</button>
                  </div>
                )}
            {cateButton && <AddCategories setCatButton={setcateButton} />}
            <table>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Delete</th>
                    <th>Update</th>
                </tr>
                <tbody>
                    {
                        categories.map((cat) => {
                            return (
                                <tr>
                                    <td>{cat.id}</td>
                                    <td>{cat.name}</td>
                                    <td><button onClick={() => handleDelete(cat.id)}>Delete</button></td>
                                    <td><button onClick={() => handleUpdate(cat.id, cat.name)}>Update</button></td>
                                </tr>

                                // <li>{cat.id}   {cat.name}</li>
                            )
                        })

                    }</tbody>
            </table>
            <button onClick={addCategoriesHandler} >Add categories</button>
             {updateCategories && <UpdateCategory catId={updateItem.id} catName={updateItem.name} updateState={setupdateCategories}/>} 
        </React.Fragment>
    )
};

export default Categories