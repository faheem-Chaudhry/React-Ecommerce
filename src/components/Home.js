import React, { useState, useRef, useContext, useEffect } from "react";
import Header from "./Header";
import Categories from "./Categories/Categories";
import Products from "./Products/Products";
import CartProvider from "../store/CartProvider";
import CartContext from "../store/cart-context";
import Cart from "./Cart";
import ShowNotSignIn from "./ShowNotSIgnIn";
import Orders from "./Orders";
import SuccessOrder from "./SuccessOrder";

const Home = (props) => {
    
    const cartCtx = useContext(CartContext);
    const [quantity, setQuantity] = useState(1);
    const [isCategories, setIsCategories] = useState(false);
    const [isProducts, setIsProducts] = useState(false);
    const [isOrders, setIsOrders] = useState(false);
    const [productsShow, setProductsShow] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [notSignIn, setNotSignIn] = useState(false)
    const [successMessege, setSuccessMessege] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    let [cartCount, setCartCount] = useState(0);
    const amountInputRef = useRef(0);
    useEffect(()=>{
        async function fetchData() {
            const response = await fetch(
              "https://react-http-8f78d-default-rtdb.firebaseio.com/ecommerce/products.json"
            );
            const data = await response.json();
            const DATA = [];
            for (const key in data) {
              DATA.push({
                id: key,
                name: data[key].name,
                image: data[key].image,
                price: data[key].price,
                category: data[key].category,
              });
            }
            setProductsShow(DATA);
          }
          fetchData();
    },[])
    const setCategories = (val) => {
        setIsCategories(val);
    }
    const setProducts = (val) => {
        setIsProducts(val);
    }
    const handleCategory = (catName) => {
        async function fetchData() {
            setProductsShow([]);
            setIsLoading(true)
            const response = await fetch('https://react-http-8f78d-default-rtdb.firebaseio.com/ecommerce/products.json');
            const data = await response.json();
            const DATA = [];

            for (const key in data) {
                if (data[key].category === catName) {
                    DATA.push({
                        id: key,
                        name: data[key].name,
                        image: data[key].image,
                        price: data[key].price,
                        category: data[key].category
                    })
                }

            }
            setProductsShow(DATA);

        }
        fetchData().then(()=>{setIsLoading(false)})
    }
    const cartHandler = (id, name, price, image) => {
        setCartCount(cartCount = cartCount + 1)
        console.log('carthandler', id)
        console.log(quantity)
        // const enteredAmount = amountInputRef.current.value;
        //const enteredAmountNumber = +enteredAmount;
        const totalAmount = quantity * price;
        console.log(totalAmount)
        cartCtx.addItem({
            id: id,
            name: name,
            price: price,
            image: image,
            quantity: quantity
        }, totalAmount);
        setQuantity(1)
    }
    return (
        <React.Fragment>

            <Header
                cartCount = {cartCount}
                setIsLoading={setIsLoading}
                handleCategory={handleCategory}
                checkAdmin={props.checkAdmin}
                setIsLogin={props.setIsLogin}
                setCategories={setCategories}
                setProducts={setProducts}
                setOrders={setIsOrders}
                fromLogin={props.fromLogin}
                showCart={setShowCart}
            />
            {isLoading?<p>Loading...</p> : (((showCart || props.checkCartToLogin) && <Cart showCart={setShowCart}
                setCartCount= {setCartCount}
                setNotSignIn={setNotSignIn}
                cartToLogin={props.cartToLogin}
                setSuccessMessege={setSuccessMessege}
                 />))}

            {successMessege && <SuccessOrder setSuccessMessege={setSuccessMessege}/>}
            {isCategories && <Categories />}
            {isProducts && <Products />}
            {isOrders && <Orders />}
            {notSignIn && <ShowNotSignIn setNotSignIn={setNotSignIn}
                setIsLogin={props.setIsLogin}
                cartToLogin={props.cartToLogin}
                setShowCart={setShowCart} />}
            <table>
                {!props.checkCartToLogin && !props.checkAdmin && !notSignIn && !showCart && <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Image</th>
                    <th>quantity</th>
                </tr>}
                <tbody>
                    {
                        !props.checkCartToLogin &&!props.checkAdmin && !notSignIn && !showCart && productsShow.map((cat) => {
                            return (
                                <tr>
                                    <td>{cat.name}</td>
                                    <td>{cat.price}</td>
                                    <td>{cat.category}</td>
                                    <td><img height='100px' width='200px' src={cat.image} /></td>
                                    <td><input onChange={(e) => { setQuantity(parseInt(e.target.value)) }}
                                        ref={amountInputRef}
                                        type="number" min='1' max='5' defaultValue='1' step='1' /></td>
                                    <td><button onClick={() => { cartHandler(cat.id, cat.name, cat.price, cat.image) }}>Add to cart</button></td>
                                </tr>
                            )
                        })

                    }</tbody>
            </table>

        </React.Fragment>
    )
}
export default Home;