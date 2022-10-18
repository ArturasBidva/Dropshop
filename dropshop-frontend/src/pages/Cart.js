import {
    Alert,
    Button,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {
    decreaseProductQuantity,
    increaseProductQuantity,
    removeFromCart,
    resetCart
} from "../store/slices/cart/cartSlice";
import {useTranslation} from "react-i18next";
import OrderForm from "../components/forms/OrderForm";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {useEffect, useState} from "react";
import {getUser} from "../api/userApi";

export default () => {
    const products = useSelector(state => state.cart);
    const total = products.reduce((sum, {quantity, priceWithCard}) => sum + (quantity * priceWithCard), 0);
    const user = useSelector(state => state.user.user)
    const {t} = useTranslation('cart');
    const dispatcher = useDispatch();
    const removeCartItem = (id) => dispatcher(removeFromCart(id));
    const increaseQuantity = (id) => dispatcher(increaseProductQuantity(id));
    const decreaseQuantity = (id) => dispatcher(decreaseProductQuantity(id));
    const clearCart = () => dispatcher(resetCart());
    const [error] = useState(false);
    const [balance, setBalance] = useState([])
    const [loading, setLoading] = useState([]);

    useEffect(() => {
        getUser(user.username)
            .then(({data}) => {

                setBalance(data.balance)
            })
            .catch((error) => console.log(error)).finally(() => setLoading(false))
    }, []);

    return (
        <>
            {
                products.length === 0 ? <Alert severity="info">Cart is empty</Alert> :
                    <>
                        <div className="cart-container">
                            <TableContainer component={Paper}>
                                <Table sx={{minWidth: 500}} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{width: '25%'}}>{t('name')}</TableCell>
                                            <TableCell sx={{width: '20%'}}>{t('category')}</TableCell>
                                            <TableCell sx={{width: '13%'}} align="center">{t('quantity')}</TableCell>
                                            <TableCell sx={{width: '10%'}} align="right">{t('price')}</TableCell>
                                            <TableCell sx={{width: '10%'}} align="right">{t('totalItem')}</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {products.map((product) => (
                                            <TableRow key={product.id}>
                                                <TableCell component="th" scope="row">
                                                    {product.title}
                                                </TableCell>
                                                <TableCell>{product.category}</TableCell>
                                                <TableCell align="right">
                                                    <Button variant="outlined"
                                                            disabled={product.quantity < 2}
                                                            sx={{p: 0, minWidth: '25px', mr: 1}}
                                                            onClick={() => decreaseQuantity(product.id)}>-</Button>
                                                    {product.quantity}
                                                    <Button variant="outlined"
                                                            sx={{p: 0, minWidth: '25px', ml: 1}}
                                                            onClick={() => increaseQuantity(product.id)}>+</Button>

                                                </TableCell>
                                                <TableCell align="right">{product.priceWithCard}</TableCell>
                                                <TableCell
                                                    align="right">{(product.priceWithCard * product.quantity).toFixed(2)}</TableCell>
                                                <TableCell align="right">
                                                    <IconButton>
                                                        <DeleteOutlineIcon color="warning"
                                                                           onClick={() => removeCartItem(product.id)}/>
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <div className="cart-address-container">
                                <div className="cart-address-content">
                                    <div className="order-price-container">
                                        {t('total')} {total.toFixed(2)}
                                    </div>
                                    <div className="user-balance-container">
                                        <div>{t('balance')} {balance}</div>
                                    </div>
                                    <b className="delivery-title">Pristatymo adresas</b>
                                    <OrderForm
                                        clearCart={clearCart}
                                        translator={t}
                                        products={products}
                                        totalPrice={total}
                                        error={error}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
            }
        </>
    );
}