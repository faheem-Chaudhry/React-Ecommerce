import React from "react";

const SuccessOrder = (props) => {
    const closeHandler = () => {
        props.setSuccessMessege(false);
    }
    return(
        <div>
            <h2>Your order has been successfully placed</h2>
            <button onClick={closeHandler}>close</button>
        </div>
    )
}

export default SuccessOrder;