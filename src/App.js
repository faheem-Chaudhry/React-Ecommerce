import React, { useState } from "react";
import LoginPage from "./components/LoginPage";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import CartProvider from "./store/CartProvider";
function App() {
  const [isLogin, setIsLogin] = useState(false)
  const [adminLogin, setadminLogin] = useState(false);
  const [isSignUp, setISSignUp] = useState(false)
  const [fromLogin, setFromLogin] = useState(false)
  const [cartToLogin, setCartToLogin] = useState(false)
  let [cartCount, setCartCount] = useState(0);
  console.log(isLogin)
  const setLogin = (val) => {
    setIsLogin(val)
  }
  console.log('cartToLogin', cartToLogin)
  return (
    <div>
      <CartProvider>
        {isSignUp && <SignUp isSignUp={setISSignUp} />}
        {isLogin && !adminLogin && !isSignUp && <Login
          setAdminLogin={setadminLogin}
          setIsLogin={setLogin}
          isSignUp={setISSignUp}
          setFromLogin={setFromLogin} />}
        {isLogin && adminLogin && <LoginPage setIsLogin={setLogin} adminLogin={setadminLogin} />}

        {!isLogin && <Home setIsLogin={setLogin}
          checkAdmin={adminLogin}
          fromLogin={fromLogin}
          checkCartToLogin={cartToLogin}
          cartToLogin={setCartToLogin}
          cartCount={cartCount}
          setCartCount={setCartCount} />}
      </CartProvider>
    </div>
  );
}

export default App;
