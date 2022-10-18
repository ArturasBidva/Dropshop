import {getAllOrders} from "../api/userApi";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Loading from "../utils/Loading";

const Orders = () => {

    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const {t} = useTranslation('orderPage');


    useEffect(() => {
        getAllOrders()
            .then(({data}) => setOrders(data))
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            {
                loading ? <Loading size={80}/> :
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 500}} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{width: '5%'}} >{t('orderId')}</TableCell>
                                    <TableCell sx={{width: '5%'}}>{t('firstName')}</TableCell>
                                    <TableCell sx={{width: '5%'}}>{t('lastName')}</TableCell>
                                    <TableCell sx={{width: '5%'}}>{t('address')}</TableCell>
                                    <TableCell sx={{width: '5%'}}>{t('city')}</TableCell>
                                    <TableCell sx={{width: '3%'}}>{t('totalPrice')}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell component="th" scope="row">
                                            <TableCell>{order.id}</TableCell>
                                        </TableCell>
                                        <TableCell>{order.firstName}</TableCell>
                                        <TableCell>{order.lastName}</TableCell>
                                        <TableCell>{order.address}</TableCell>
                                        <TableCell>{order.city}</TableCell>
                                        <TableCell align="center">{order.price}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

            }
        </>
    );
}

export default Orders