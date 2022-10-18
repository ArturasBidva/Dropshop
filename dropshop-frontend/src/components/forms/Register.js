import {Form, Formik} from "formik";
import {Alert, Box, Button, CircularProgress, Paper, Stack, Typography} from "@mui/material";
import FormTextInput from "./FormTextInput";
import * as Yup from 'yup';
import {useState} from "react";
import {register} from "../../api/userApi"
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

const registerValidationSchema = Yup.object().shape(
    {
        username: Yup.string().required().min(10).max(30),
        name: Yup.string().required().min(5).max(20),
        password: Yup.string().required().min(10).max(30)
    });

export default () => {
    const {t} = useTranslation('pageLogin');
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const onRegister = (data, helpers) => {
        register(data)
            .then(() => {
                navigate('/login');
            })
            .catch((error) => setError(true))
            .finally(() => helpers.setSubmitting(false));
    }

    return (
        <Formik
            initialValues={{
                username: '',
                name: '',
                password: ''
            }}
            validationSchema={registerValidationSchema}
            onSubmit={onRegister}
        >
            {
                props => (
                    <Form>
                        <Paper elevation={0}
                               sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh'}}>
                            <Box sx={{width: 400}}>
                                <Stack spacing={2}>
                                    {error && <Alert severity="error">User already exist</Alert>}
                                    <FormTextInput
                                        name="username"
                                        label={t('usernameLabel')}
                                        placeholder={t('username')}
                                        error={props.touched.username && !!props.errors.username}/>
                                    <FormTextInput
                                        name="name"
                                        label={t('nameLabel')}
                                        placeholder={t('username')}
                                        error={props.touched.name && !!props.errors.name}/>
                                    <FormTextInput
                                        name="password"
                                        type="password"
                                        label={t('passwordLabel')}
                                        placeholder={t('password')}
                                        error={props.touched.password && !!props.errors.password}/>
                                    <Typography sx={{textAlign: 'right', mt: 2}}>
                                        {
                                            props.isSubmitting ? <CircularProgress size={40}/> :
                                                <Button variant="outlined"
                                                        type="submit"
                                                        color="primary">{t('register')}</Button>
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
