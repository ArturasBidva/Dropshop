import * as React from 'react';
import {useEffect, useState} from 'react';
import {getProducts} from "../api/productApi";
import "../App.css"
import Product from "./Product";
import "../product.css"
import {useDispatch, useSelector} from "react-redux";
import {addToCart} from "../store/slices/cart/cartSlice";
import Pagination from "../components/Pagination";

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
    const [productsPerPage] = useState(10)
    const indexOfLastPost = currentPage * productsPerPage;
    const indexOfFirstPost = indexOfLastPost - productsPerPage;
    let productss = products.filter(it => it.category === window.location.pathname.replace("/", ""))
    const currentProducts = productss.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = (pageNumber) => setCurrentPage(pageNumber)


    return (
        <>
            {
                <div className="product-container">
                    {currentProducts.map((product, index) => (
                        <Product
                            key={product.title}
                            itemproduct={product}
                            someKey={product}
                            currentUser={user}
                            addToCart={addProduct}
                        />
                    ))}
                </div>

            }<div className="pagination">
            <Pagination postPerPage={productsPerPage} totalPosts={productss.length} paginate={paginate}/>
        </div>
        </>

    )
}

export default GetAllProducts