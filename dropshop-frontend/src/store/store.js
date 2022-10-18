import cart, {loadProductsFromStorage, subscribeToStore} from "./slices/cart/cartSlice";
import user from './slices/user/userSlice'
import {logger} from "redux-logger/src";
import {configureStore} from "@reduxjs/toolkit";

const buildStore = () => {
    const store = configureStore(
        {
            reducer: {
                cart, user
            },
            middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
            preloadedState: {
                cart: loadProductsFromStorage()
            }
        }
    );

    subscribeToStore(store);

    return store;
}

const store = buildStore();

export default store;
