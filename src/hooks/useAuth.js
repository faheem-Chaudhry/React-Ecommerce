import { useContext } from "react";
import CartContext from "../store/cart-context";

const useAuth = () => {
    return useContext(CartContext)
}

export default useAuth;