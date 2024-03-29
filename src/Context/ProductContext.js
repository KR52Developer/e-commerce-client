import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { cartReducer } from "../Hooks/reducers";
import axios from "axios";
import { UserContext } from "./UserContext";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {



    const [products, setProducts] = useState([]);
    const { loggedUser, loggedUser: { _id } } = useContext(UserContext);
    // console.log(loggedUser);


    const [state, dispatch] = useReducer(cartReducer, {
        products: products,
        cart: [],
    });


    // console.log(state.cart);


    useEffect(() => {
        axios.get("https://dull-gold-marlin-tux.cyclic.app/api/v1/products")
            .then((res) => {
                console.log(res);
                setProducts(res.data.products);
            });



    }, []);





    useEffect(() => {
        if (loggedUser._id) {
            console.log(_id);
            const fetchCart = async () => {
                try {
                    // console.log(_id);
                    const res = await axios.get(`https://dull-gold-marlin-tux.cyclic.app/api/v1/cart/${_id}`);
                    // console.log(res);
                    let cart = res.data;
                    // console.log(cart);
                    if (cart) {
                        dispatch({ type: 'SET_CART', payload: res.data.cart.items });

                    }
                } catch (error) {
                    console.error(error);
                }

            };

            return () => {
                fetchCart();
            };
        }


    }, [loggedUser, _id]);


    console.log(state.cart);



    return (
        <CartContext.Provider value={{ products, setProducts, state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

