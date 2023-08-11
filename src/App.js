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
import Header from "./components/Header";
import Cart from "./components/Cart";
import useAuth from "./hooks/useAuth";
import CartContext from "./store/cart-context";
import RequireAuth from "./components/RequireAuth";
import { Route, Routes } from "react-router-dom";
import OrderDetail from "./components/OrderDetail";
function App() {
  const cartCtx = useAuth()
  const [isLogin, setIsLogin] = useState(false);
  const [adminLogin, setadminLogin] = useState(false);
  const [isSignUp, setISSignUp] = useState(false);
  const [fromLogin, setFromLogin] = useState(false);
  const [cartToLogin, setCartToLogin] = useState(false);
  let [cartCount, setCartCount] = useState(0);
  const admin = JSON.parse(localStorage.getItem('admin'));
  console.log(isLogin);
  const setLogin = (val) => {
    setIsLogin(val);
  };
  console.log("cartToLogin", cartToLogin);
  return (
    <div>
      <CartProvider>
        <Routes>
          <Route
            path="/signup"
            element={<SignUp isSignUp={setISSignUp} />}
          ></Route>
          <Route
            path="/login"
            element={
              <Login
                setAdminLogin={setadminLogin}
                setIsLogin={setLogin}
                isSignUp={setISSignUp}
                setFromLogin={setFromLogin}
              />
            }
          />
          <Route
            path="/admin-login"
            element={
              <LoginPage setIsLogin={setLogin} adminLogin={setadminLogin} />
            }
          />
          {/* </Routes> */}

          {/* <Routes> */}
          

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

            <Route path="orders" >
              <Route index element={<Orders />}/>
              <Route path='detail'>
                <Route path=':detail_id' element={<OrderDetail />}/>
              </Route>
            </Route>

          </Route>
          </Route>
          {/* </Routes> */}

          {/* <Routes> */}

          <Route path="/" >
            <Route index element={<Home
                setIsLogin={setLogin}
                checkAdmin={adminLogin}
                fromLogin={fromLogin}
                checkCartToLogin={cartToLogin}
                cartToLogin={setCartToLogin}
                cartCount={cartCount}
                setCartCount={setCartCount}
              />}/>
            <Route path='cart' >
              <Route index element={<Cart />}/>
              <Route path='notSignIn' element={<ShowNotSignIn />}/>
              <Route path='successOrder' element={<SuccessOrder />}/>
            </Route>  
          </Route>

        </Routes>
        {/* {isSignUp && <SignUp isSignUp={setISSignUp} />} */}
        {/* {isLogin && !adminLogin && !isSignUp && (
            <Login
              setAdminLogin={setadminLogin}
              setIsLogin={setLogin}
              isSignUp={setISSignUp}
              setFromLogin={setFromLogin}
            />
          )} */}

        {/* {isLogin && adminLogin && (
            <LoginPage setIsLogin={setLogin} adminLogin={setadminLogin} />
          )} */}

        {/* {!isLogin && (
            <Home
              setIsLogin={setLogin}
              checkAdmin={adminLogin}
              fromLogin={fromLogin}
              checkCartToLogin={cartToLogin}
              cartToLogin={setCartToLogin}
              cartCount={cartCount}
              setCartCount={setCartCount}
            />
          )} */}
      </CartProvider>
    </div>
  );
}

export default App;
