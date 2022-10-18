import {createSlice} from "@reduxjs/toolkit";
import {addToStorage, getFromStorage} from "../../../storage/localStorage";

const initialState = [];

const cartSlice = createSlice(
    {
        name: 'cart',
        initialState,
        reducers: {
            resetCart(state) {
                return state = [];
            },
            addToCart(state, {payload: product}) {
                const existingProduct = state.find(p => p.id === product.id);
                if (existingProduct) {
                    existingProduct.quantity++;
                } else {
                    product.quantity = 1;
                    state.push(product);
                }
            },
            removeFromCart(state, {payload: id}) {
                return state.filter(p => p.id !== id);
            },

            decreaseProductQuantity(state, {payload: id}) {
                const product = state.find(p => p.id === id);
                if (product) {
                    product.quantity--;
                }
            },
            increaseProductQuantity(state, {payload: id}) {
                const product = state.find(p => p.id === id);
                if (product) {
                    product.quantity++;
                }
            },
        }
    }
);

let cartState = [];
const subscribeToStore = (store) => {
    store.subscribe(() => {
        const cart = store.getState().cart;
        if (cartState !== cart) {
            addToStorage('cart', cart);
            cartState = cart;
        }
    });
};

const loadProductsFromStorage = () => getFromStorage('cart') || [];

export default cartSlice.reducer;
export const {
    addToCart,
    removeFromCart,
    increaseProductQuantity,
    decreaseProductQuantity,
    resetCart
} = cartSlice.actions;
export {
    subscribeToStore,
    loadProductsFromStorage,

}
