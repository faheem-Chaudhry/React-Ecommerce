import React from "react";
import { useNavigate } from "react-router-dom";

const ShowNotSignIn = (props) => {
    const navigate = useNavigate()

    const handleSignIn = () => {
        navigate('/login')
        // props.setNotSignIn(false);
        // props.setIsLogin(true)
        // props.cartToLogin(true);
        // props.setShowCart(true);
    }
    return (
        <React.Fragment>
            <p>first you have to signIn to place order</p>
            <button onClick={handleSignIn}>SignIn</button>
        </React.Fragment>
    )
}

export default ShowNotSignIn;