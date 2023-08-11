import React from "react";
import { useNavigate } from "react-router-dom";

const SuccessOrder = (props) => {
    const navigate = useNavigate();
    const closeHandler = () => {
        navigate('/')
        //props.setSuccessMessege(false);
    }
    return(
        <div>
            <h2>Your order has been successfully placed</h2>
            <button onClick={closeHandler}>close</button>
        </div>
    )
}

export default SuccessOrder;