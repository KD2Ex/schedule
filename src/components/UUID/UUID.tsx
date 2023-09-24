import React from 'react';
import { SettingsBox } from '../styled/SettingsBox';
import {Box, Button, Grid, TextField, Typography, useTheme} from "@mui/material";
import ProfileButton from "../styled/ProfileButton";
import alerts from "../../store/alerts";
import {log} from "util";
import user from "../../store/user";

const Uuid = () => {


    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(user.profile.uuid)
        alerts.openSuccessAlert('Скопировано в буфер обмена!');
    }

    const theme = useTheme()

    const handleUUIDClick = (e) => {
        let range = new Range();
        console.log(e)
        range.selectNode(e.target)
        console.log(range)
        document.getSelection().removeAllRanges()
        document.getSelection().addRange(range)
        handleCopyToClipboard()
    }

    return (
        <>
{/*
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 1
            }}>

            </Box>*/}
           {/* <Grid item xs={12} md={2}>
                <Typography
                    variant={'h6'}
                    sx={{
                        mb: 1,
                    }}
                >
                    UUID
                </Typography>
            </Grid>
*/}
            <Grid
                item
                xs={12}
                sx={{
					display: 'flex',
					justifyContent: 'space-between',
					columnGap: 1,
                }}
            >

                <TextField
                    sx={{
                        width: '100%',
                        textAlign: 'center'
                    }}
                    size={'small'}
                    label={'UUID'}
                    value={user.profile.uuid}
                    onClick={handleUUIDClick}
                    InputLabelProps={{ shrink: true }}
                />

				<Button
					sx={{
						display: {xs: 'none', md: 'flex'}
					}}
					variant={'outlined'}
					onClick={handleCopyToClipboard}>
					Скопировать
				</Button>
            </Grid>


        </>

    );
};

export default Uuid;