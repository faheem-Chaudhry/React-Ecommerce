import React from "react";
interface item {
  id: string;
  name: string;
  image: string;
  price: string;
  quantity: number;
}
interface cartContextValue {
  items: item[];
  cartCount: number;
  adminLogin: boolean;
  totalAmount: number;
  email: string;
  updateCartCount: () => void;
  addItem: (item: item, amount: number) => void;
  addEmail: (email: string) => void;
  setAdminLogin: (val: boolean) => void;
  reset: () => void;
}
const Context: cartContextValue = {
  items: [
    {
      id: "",
      name: "",
      image: "",
      price: "",
      quantity: 0,
    },
  ],
  cartCount: 0,
  adminLogin: false,
  totalAmount: 0,
  email: "",
  updateCartCount: () => {},
  addItem: (item, amount) => {},
  addEmail: (email) => {},
  setAdminLogin: (val) => {},
  reset: () => {},
};

const CartContext = React.createContext<cartContextValue>(Context);

// const CartContext = React.createContext({
//   cartCount: 0,
//   adminLogin: false,
//   items: item[],
//   totalAmount: 0,
//   email: '',
//   updateCartCount: ()=>{},
//   addItem: (item: item, amount: number) => { },
//   addEmail: (email:string) => {},
//   setAdminLogin: (val: boolean)=>{},
//   reset: ()=>{}
// });

export default CartContext;
