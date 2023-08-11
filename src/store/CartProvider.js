import { useReducer, useState } from 'react';

import CartContext from './cart-context';



const CartProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [email, setEmail] = useState('');
  const [adminLog, setAdminLog] = useState(false);
  let [cartCount, setCartCount] = useState(0)


  const addItemToCartHandler = (item, amount) => {
    console.log(item.id)
    const existingCartItemIndex = cartItems.findIndex(
      (Item) => Item.id === item.id
    );
    const existingCartItem = cartItems[existingCartItemIndex];
    if (existingCartItem) {
      let updatedItems;
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + item.quantity
      };
      updatedItems = [...cartItems];
      updatedItems[existingCartItemIndex] = updatedItem;
      setCartItems(updatedItems)
      setTotalAmount((prevAmount) => prevAmount + amount)
    }
    else {
      setCartItems((prevCartItems) => [...prevCartItems, item]);
      setTotalAmount((prevAmount) => prevAmount + amount)
    }

    console.log(cartItems)
    console.log(totalAmount)
    // dispatchCartAction({ type: 'ADD', item: item });
  };

  const addEmailHandler = (email) => {
    setEmail(email);
  }
  const adminHandler = (value) => {
    setAdminLog(value);
  }
  console.log('check admin value : ', adminLog)
  const resetHandler = () =>{
    setCartItems([])
      setTotalAmount(0)
      setCartCount(0)
  }
  const countHandler = () => {
    setCartCount(cartCount+1)
  }
  const cartContext = {
    cartCount: cartCount,
    adminLogin: adminLog,
    items: cartItems,
    totalAmount: totalAmount,
    email: email,
    setAdminLogin: adminHandler,
    updateCartCount: countHandler,
    addItem: addItemToCartHandler,
    addEmail: addEmailHandler,
    reset: resetHandler
    // removeItem: removeItemFromCartHandler,
  };
  console.log('cartctx', cartContext.adminLogin)

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
