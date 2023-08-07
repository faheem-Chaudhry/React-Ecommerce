import React, { useContext,useState } from "react";
import CartContext from "../store/cart-context";

const Cart = (props) => {
    const [successMessegeState, setSuccessMessegeState] = useState(false)
    const cartCtx = useContext(CartContext);
    const closeCartHandler = () => {
        props.showCart(false);
        props.setSuccessMessege(false);
        setSuccessMessegeState(true)
    }
    const orderCartHandler = (event) => {
        event.preventDefault();
        if (cartCtx.email === '') {
            console.log('if')
            props.setNotSignIn(true);
            props.showCart(false);
            props.setSuccessMessege(false);
        }
        else {
            console.log('else');
            const Items = [];
            cartCtx.items.map((cat) => {
                return (
                    Items.push({
                        name: cat.name,
                        price: cat.price,
                        image: cat.image,
                        quantity: cat.quantity
                    })
                )
            });
            fetch('https://react-http-8f78d-default-rtdb.firebaseio.com/ecommerce/orders.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: cartCtx.email,
                    grandTotal: cartCtx.totalAmount,
                    details: Items.map((cat) => ({
                        name: cat.name,
                        price: cat.price,
                        image: cat.image,
                        quantity: cat.quantity
                    }))

                }),
            }).then(() => {
                props.showCart(false);
                props.cartToLogin(false);
                if(successMessegeState === false){
                props.setSuccessMessege(true);
                cartCtx.reset();
                props.setCartCount(0);
                }
                setSuccessMessegeState(false)
                
            })
        }

    }
    return (
        <form onSubmit={orderCartHandler}>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cartCtx.items.map((cat) => {
                            return (
                                <tr>
                                    <td>{cat.name}</td>
                                    <td>{cat.price}</td>
                                    <td><img height='100px' width='200px' src={cat.image} /></td>
                                    <td>{cat.quantity}</td>
                                </tr>
                            )
                        })

                    }</tbody>
            </table>
            <h3>Grand Total = {cartCtx.totalAmount}</h3>
            <button onClick={closeCartHandler}>Close</button>
            <button type="submit">Order</button>
        </form>
    )
}

export default Cart