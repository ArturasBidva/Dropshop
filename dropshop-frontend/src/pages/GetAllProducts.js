import * as React from 'react';
import {useEffect, useState} from 'react';
import {getProducts} from "../api/productApi";
import "../App.css"
import Product from "./Product";
import "../product.css"
import {useDispatch, useSelector} from "react-redux";
import {addToCart} from "../store/slices/cart/cartSlice";
import Pagination from "../components/Pagination";
import {useTranslation} from "react-i18next";

const GetAllProducts = () => {
    useEffect(() => {
        getProducts()
            .then(({data}) => setProducts(data))
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
    }, []);

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = useSelector(state => state.user.user);
    const addProduct = (product) => dispatcher(addToCart(product));
    const dispatcher = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(12)
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    let productss = products.filter(it => it.category === window.location.pathname.replace("/", ""))
    const currentProducts = productss.slice(indexOfFirstProduct, indexOfLastProduct);
    const paginate = (pageNumber) => setCurrentPage(pageNumber)
    const {t} = useTranslation('product');


    return (
        <>
            <div className="pagination">
                <Pagination postPerPage={productsPerPage} totalProducts={productss.length} paginate={paginate}/>
            </div>
            {
                <div className="product-container">
                    {currentProducts.map((product, index) => (
                        <Product
                            key={product.title}
                            itemproduct={product}
                            someKey={product}
                            currentUser={user}
                            addToCart={addProduct}
                            translate={t}
                        />
                    ))}
                </div>

            }
        </>

    )
}

export default GetAllProducts