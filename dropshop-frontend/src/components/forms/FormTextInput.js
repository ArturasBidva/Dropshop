import {ErrorMessage, Field} from "formik";
import {FormControl, FormHelperText, TextField} from "@mui/material";

export default ({name,password, pattern, label = '', error, placeholder = 'Type here...', ...props}) => (
    <FormControl error={error}>
        <Field
            type={password}
            id={name}
            name={name}
            label={label}
            placeholder={placeholder}
            as={TextField}
            pattern={pattern}
            error={error}
            {...props}
        />
        <ErrorMessage name={name}
                      component={FormHelperText}/>
    </FormControl>
)