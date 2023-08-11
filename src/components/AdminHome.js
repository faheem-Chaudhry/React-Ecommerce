import React, { useState, useRef, useContext, useEffect } from "react";
import AdminHeader from "./AdminHeader";
import Categories from "./Categories/Categories";
import Products from "./Products/Products";
import Orders from "./Orders";
import { Route, Routes, Outlet } from "react-router-dom";

const AdminHome = (props) => {
  const [isCategories, setIsCategories] = useState(false);
  const [isProducts, setIsProducts] = useState(false);
  const [isOrders, setIsOrders] = useState(false);

  const setCategories = (val) => {
    setIsCategories(val);
  };
  const setProducts = (val) => {
    setIsProducts(val);
  };
  return (
    <React.Fragment>
       {/* <AdminHeader /> */}
        <h1>This is Admin Panel</h1>

           
           
        {/* <Outlet /> */}
        {/* <Routes>
            <Route path="/admin/categories" element={<Categories />}/>
            <Route path="/admin/products" element={<Products />}/>
            <Route path="/admin/orders" element={<Orders />}/>
         
        </Routes> */}
      {/* </AdminHeader> */}
    </React.Fragment>
  );
};

export default AdminHome;
