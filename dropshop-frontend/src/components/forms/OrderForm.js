import React, {Component} from "react";
import {Box, Button, CircularProgress, Paper, Stack, Typography} from "@mui/material";
import {Form, Formik} from "formik";
import FormTextInput from "./FormTextInput";
import {checkout} from "../../api/userApi";
import * as Yup from "yup";
import {connect} from "react-redux";
import {resetCart} from "../../store/slices/cart/cartSlice";

class OrderForm extends Component {
    handleOnClick = (data) => {
        checkout(data).then(r => console.log("gg")).finally()
        return this.props.onTodoClick();
    }

    render() {

        const CheckoutValidationSchema = Yup.object().shape(
            {
                firstName: Yup.string().required().min(5).max(50),
                lastName: Yup.string().required().min(5).max(50),
                address: Yup.string().required().min(10).max(50),
                city: Yup.string().required().min(5).max(50)
            }
        );


        return (

            <Formik
                enableReinitialize={true}
                validationSchema={CheckoutValidationSchema}
                initialValues={
                    {
                        firstName: '',
                        lastName: '',
                        address: '',
                        city: '',
                        price: this.props.totalPrice,
                        productList: this.props.products,
                    }
                }
                onSubmit={this.handleOnClick}
            >
                {
                    props => (
                        <Form className="butinas">
                            <Paper elevation={0}>
                                <Box sx={{width: 400}}>
                                    <Stack spacing={2}>
                                        <FormTextInput
                                            name="firstName"
                                            label={this.props.translator('firstnameLabel')}
                                            placeholder={this.props.translator('firstname')}
                                            error={props.touched.title && !!props.errors.title}/>
                                        <FormTextInput
                                            name="lastName"
                                            label={this.props.translator('lastnameLabel')}
                                            placeholder={this.props.translator('lastname')}
                                            error={props.touched.category && !!props.errors.category}/>
                                        <FormTextInput
                                            name="address"
                                            label={this.props.translator('addressLabel')}
                                            placeholder={this.props.translator('address')}
                                            error={props.touched.description && !!props.errors.description}/>
                                        <FormTextInput
                                            name="city"
                                            label={this.props.translator('cityLabel')}
                                            placeholder={this.props.translator('city')}
                                            error={props.touched.imageUrl && !!props.errors.imageUrl}/>
                                        <Typography sx={{textAlign: 'right', mt: 2}}>
                                            {
                                                props.isSubmitting ? <CircularProgress size={40}/> :
                                                    <div className="checkout-button-cart">
                                                        <Button disabled={this.props.totalPrice > this.props.balance}
                                                                type="submit" variant="contained"
                                                                color="success">{this.props.translator('checkout')}</Button>
                                                    </div>
                                            }
                                        </Typography>
                                    </Stack>
                                </Box>
                            </Paper>
                        </Form>
                    )
                }
            </Formik>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTodoClick: () => {
            dispatch(resetCart())
        }
    }
}

export default connect(null, mapDispatchToProps)(OrderForm)