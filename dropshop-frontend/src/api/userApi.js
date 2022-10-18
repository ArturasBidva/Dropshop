import HTTP from "./index";

const getUser = (userId) => HTTP.get(`/user/${userId}`);

const addCreditCard = (data) => HTTP.post("/creditcard", data);

const checkout = (data) => HTTP.post("/checkout", data);

const getAllOrders = () => HTTP.get("orders");

const topUpBalance = (balance) => HTTP.post("/topup", balance,
    {
        headers: {
            'Content-Type': 'application/json',
        }
    });

const login = (data) => HTTP.post('/login', data)

export function register(data) {
    return HTTP.post(`/register`, data, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

export {getUser, addCreditCard, topUpBalance, login,checkout,getAllOrders}