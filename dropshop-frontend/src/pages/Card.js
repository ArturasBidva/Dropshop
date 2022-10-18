import {Form, Formik} from "formik";
import {Alert, Box, Button, CircularProgress, Paper, Stack, Typography} from "@mui/material";
import FormTextInput from "../components/forms/FormTextInput";
import {useState} from "react";
import Cards from 'react-credit-cards';
import {addCreditCard} from "../api/userApi";
import {useTranslation} from "react-i18next";
import * as Yup from "yup";

export default () => {

    const [error, setError] = useState(false);
    const {t} = useTranslation('creditCard');
    const cardValidationSchema =
        Yup.object().shape(
            {
                cvc: Yup.string().required().matches(/^[0-9]+$/, "Must be only digits").min(3).max(3),
                expiry: Yup.string().required().max(10),
                name: Yup.string().required().max(30),
                number: Yup.string().required().matches(/^[0-9]+$/, "Must be only digits").min(16).max(16)
            });

    const onCardSubmit = (data, helpers) => {
        addCreditCard(data)
            .then(() => {
            })
            .catch((error) => setError(true))
            .finally(() => helpers.setSubmitting(false));
    }
    return (
        <Formik
            initialValues={{
                cvc: '',
                expiry: '',
                name: '',
                number: '',
            }}
            validationSchema={cardValidationSchema}
            onSubmit={onCardSubmit}

        >
            {
                props => (
                    <Form>
                        <Paper elevation={0}
                               sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh'}}>
                            <Box sx={{width: 400}}>
                                <Stack spacing={2}>
                                    {error && <Alert severity="error">Wrong credit card</Alert>}
                                    <FormTextInput
                                        name="number"
                                        label={t('creditCardNumberLabel')}
                                        placeholder={t('creditCardNumber')}
                                        error={props.touched.number && !!props.errors.number}/>
                                    <FormTextInput
                                        name="name"
                                        label={t('creditCardHolderNameLabel')}
                                        placeholder={t('CreditCardHolderName')}
                                        error={props.touched.name && !!props.errors.name}/>
                                    <FormTextInput
                                        name="expiry"
                                        label={t('cardExpDateLabel')}
                                        placeholder={t('cardExpDate')}
                                        error={props.touched.expiry && !!props.errors.expiry}/>
                                    <FormTextInput
                                        name="cvc"
                                        label={t('cvcNumberLabel')}
                                        placeholder={t('cvcNumber')}
                                        error={props.touched.cvc && !!props.errors.cvc}/>
                                    <Typography sx={{textAlign: 'right', mt: 2}}>
                                        {
                                            props.isSubmitting ? <CircularProgress size={40}/> :
                                                <Button variant="outlined"
                                                        type="submit"
                                                        color="primary">{t('addCard')}</Button>
                                        }
                                    </Typography>
                                </Stack>
                            </Box>
                        </Paper>
                    </Form>
                )
            }
        </Formik>
    );
}
