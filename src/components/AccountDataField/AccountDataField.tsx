import React, {FC} from 'react';
import {Button, Grid, OutlinedInput} from "@mui/material";
import {SettingTypography} from "../styled/SettingTypography";

interface AccountDataFieldProps {
    title: string,
    placeholder: string,
    value: string,
    setValue: React.Dispatch<string>,
    disabled?: boolean
}

const AccountDataField: FC<AccountDataFieldProps> =
    ({
        title,
        placeholder,
        value,
        setValue,
         disabled = false
    }) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    return (
        <React.Fragment>
            <Grid item xs={12} md={2}>
                <SettingTypography>
                    {title}
                </SettingTypography>
            </Grid>
            <Grid item xs={12} md={10}>
                <OutlinedInput
                    sx={{width: '100%'}}
                    size={"small"}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                    disabled={disabled}
                >
                </OutlinedInput>
            </Grid>
        </React.Fragment>
    );
};

export default AccountDataField;