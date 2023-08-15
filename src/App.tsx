import React, { useState, useContext } from "react";
import LoginPage from "./components/LoginPage";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import CartProvider from "./store/CartProvider";
import AdminHome from "./components/AdminHome";
import AdminHeader from "./components/AdminHeader";
import Categories from "./components/Categories/Categories";
import Products from "./components/Products/Products";
import Orders from "./components/Orders";
import AddProduct from "./components/Products/AddProduct";
import UpdateProduct from "./components/Products/UpdateProduct";
import AddCategories from "./components/Categories/AddCategories";
import UpdateCategory from "./components/Categories/UpdateCategory";
import SuccessOrder from "./components/SuccessOrder";
import ShowNotSignIn from "./components/ShowNotSIgnIn";
import Cart from "./components/Cart";
import RequireAuth from "./components/RequireAuth";
import { Route, Routes } from "react-router-dom";
import OrderDetail from "./components/OrderDetail";
function App() {

  return (
    <div>
      <CartProvider>
        <Routes>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/admin-login" element={<LoginPage />} />

          {/* -----------------------------Admin Routes----------------------------------------------- */}
          <Route element={<RequireAuth />}>
            <Route path="admin" element={<AdminHeader />}>
              <Route index element={<AdminHome />}></Route>

              <Route path="categories">
                <Route index element={<Categories />} />
                <Route path="add" element={<AddCategories />} />
                <Route path="update">
                  <Route path=":cate_id" element={<UpdateCategory />} />
                </Route>
              </Route>
              <Route path="products">
                <Route index element={<Products />} />
                <Route path="add" element={<AddProduct />} />
                <Route path="update">
                  <Route path=":prod_id" element={<UpdateProduct />} />
                </Route>
              </Route>
              <Route path="orders">
                <Route index element={<Orders />} />
                <Route path="detail">
                  <Route path=":detail_id" element={<OrderDetail />} />
                </Route>
              </Route>
            </Route>
          </Route>

          <Route path="/">
            <Route index element={<Home />} />
            <Route path="cart">
              <Route index element={<Cart />} />
              <Route path="notSignIn" element={<ShowNotSignIn />} />
              <Route path="successOrder" element={<SuccessOrder />} />
            </Route>
          </Route>
        </Routes>
      </CartProvider>
    </div>
  );
}

export default App;
