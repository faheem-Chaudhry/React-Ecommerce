import React from "react";

const ShowNotSignIn = (props) => {
    const handleSignIn = () => {
        props.setNotSignIn(false);
        props.setIsLogin(true)
        props.cartToLogin(true);
        props.setShowCart(true);
    }
    return (
        <React.Fragment>
            <p>first you have to signIn to place order</p>
            <button onClick={handleSignIn}>SignIn</button>
        </React.Fragment>
    )
}

export default ShowNotSignIn;