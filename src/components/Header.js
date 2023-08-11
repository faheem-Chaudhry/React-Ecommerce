import React, { useState, useEffect , useContext} from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import CartContext from '../store/cart-context';

const Header = (props) => {
  const cartCtx = useContext(CartContext)
  const navigate = useNavigate();
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
    if(cartCtx.email !== '')
    {
      cartCtx.addEmail('');
    }
   navigate('/login')
  }
  // const onClickHandlerCat = () => {
  //   props.setCategories(true);
  //   props.setProducts(false);
  //   props.setOrders(false)
  // }
  // const onClickHandlerProds = () => {
  //   props.setProducts(true);
  //   props.setCategories(false);
  //   props.setOrders(false)
  // }
  // const onClickHandlerOrders = () => {
  //   props.setOrders(true)
  //   props.setProducts(false);
  //   props.setCategories(false);
  // }
  const handleCart= () => {
    navigate('cart')
   // props.showCart(true);
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
          } <button onClick={handleCart}>{cartCtx.cartCount}.  Cart</button>
           <button onClick={onClickHandlerSignout}>{cartCtx.email?'sign out' : 'sign in'}</button>
         </ul>}
        {/* {props.checkAdmin && <ul>
          <button onClick={onClickHandlerCat}>Categories</button>
          <button onClick={onClickHandlerProds}>Products</button>
          <button onClick={onClickHandlerOrders}>Orders</button>
          <button onClick={onClickHandlerSignout}>Sign out</button>
         
        </ul>}  */}
      </nav>
    </header>
  );
};

export default Header;
