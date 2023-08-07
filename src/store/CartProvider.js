import { useReducer, useState } from 'react';

import CartContext from './cart-context';



const CartProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [email, setEmail] = useState('')


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
  const resetHandler = () =>{
    setCartItems([])
      setTotalAmount(0)
  }
  const cartContext = {
    items: cartItems,
    totalAmount: totalAmount,
    email: email,
    addItem: addItemToCartHandler,
    addEmail: addEmailHandler,
    reset: resetHandler
    // removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
