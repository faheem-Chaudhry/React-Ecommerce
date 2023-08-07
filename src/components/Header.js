import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = (props) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {

    async function fetchData() {
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
  }, [])
  const onClickHandlerSignout = () => {
    props.setIsLogin(true)
  }
  const onClickHandlerCat = () => {
    props.setCategories(true);
    props.setProducts(false);
    props.setOrders(false)
  }
  const onClickHandlerProds = () => {
    props.setProducts(true);
    props.setCategories(false);
    props.setOrders(false)
  }
  const onClickHandlerOrders = () => {
    props.setOrders(true)
    props.setProducts(false);
    props.setCategories(false);
  }
  const handleCart= () => {
    props.showCart(true);
  }
  return (
    <header className="header-container">
      <h1>My Website </h1>
      <nav>
        {!props.checkAdmin && <ul>
          {
            categories.map((cat) => {
              return (
                <button onClick={() => props.handleCategory(cat.name)}>{cat.name}</button>

                // <li>{cat.id}   {cat.name}</li>
              )
            })
          } <button onClick={handleCart}>{props.cartCount}.  Cart</button>
          <button onClick={onClickHandlerSignout}>{props.fromLogin?'sign out' : 'sign in'}</button>
        </ul>}
        {props.checkAdmin && <ul>
          <button onClick={onClickHandlerCat}>Categories</button>
          <button onClick={onClickHandlerProds}>Products</button>
          <button onClick={onClickHandlerOrders}>Orders</button>
          <button onClick={onClickHandlerSignout}>Sign out</button>
          {/* <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li> */}
        </ul>}
      </nav>
    </header>
  );
};

export default Header;
