import HTTP from "./index";

const getProducts = () => HTTP.get('/products');


export {
	getProducts,
};