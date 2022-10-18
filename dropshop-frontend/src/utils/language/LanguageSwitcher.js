import {FormControl, MenuItem, Select} from "@mui/material";
import {useTranslation} from "react-i18next";

export default () => {
    const {i18n} = useTranslation();

    const handleChange = (event) => i18n.changeLanguage(event.target.value);

    return (
        <FormControl sx={{m: 1, minWidth: '67px',verticalAlign: '0',margin:'0'}}
                     size="small">
            <Select onChange={handleChange}
                    value={i18n.language}
                    sx={{fontSize:'0.875rem'}}>
                <MenuItem value="en"
                          selected={i18n.language === 'en'}>EN</MenuItem>
                <MenuItem value="lt"
                          selected={i18n.language === 'lt'}>LT</MenuItem>
            </Select>
        </FormControl>
    );
}
