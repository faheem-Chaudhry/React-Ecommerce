import React from 'react';

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  email: '',
  addItem: (item, amount) => { },
  addEmail: (email) => {},
  reset: ()=>{}
});

export default CartContext;