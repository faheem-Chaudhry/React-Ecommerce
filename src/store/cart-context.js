import React from 'react';

const CartContext = React.createContext({
  cartCount: 0,
  adminLogin: false,
  items: [],
  totalAmount: 0,
  email: '',
  updateCartCount: ()=>{},
  addItem: (item, amount) => { },
  addEmail: (email) => {},
  setAdminLogin: (val)=>{},
  reset: ()=>{}
});

export default CartContext;