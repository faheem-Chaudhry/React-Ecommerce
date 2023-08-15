import React, { useState, useEffect, useContext } from "react";
import "./Header.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import CartContext from "../store/cart-context";

const AdminHeader = () => {
  const navigate = useNavigate();
  const cartCtx = useContext(CartContext);
  useEffect(()=>{
    const admin = localStorage.getItem('admin')

  },[])
  const signoutHandler = () => {
    cartCtx.setAdminLogin(false);
    localStorage.clear();
    navigate('/admin-login')
  }
  return (
    <React.Fragment>
      <header className="header-container">
        <h1>My Admin 123</h1>
        <nav>
          <ul>
            <Link to="/admin/categories">Categories</Link>
            <Link to="/admin/products">Products</Link>
            <Link to="/admin/orders">Orders</Link>
            <button onClick={signoutHandler}>Signout</button>
            {/* <button onClick={onClickHandlerCat}>Categories</button>
          <button onClick={onClickHandlerProds}>Products</button>
          <button onClick={onClickHandlerOrders}>Orders</button>
          <button onClick={onClickHandlerSignout}>Sign out</button>         */}
          </ul>
        </nav>
      </header>
      <Outlet />
    </React.Fragment>
  );
};

export default AdminHeader;
