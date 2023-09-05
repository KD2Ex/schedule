import React from 'react';
import { SettingsBox } from '../styled/SettingsBox';
import {Box, Button, Grid, Typography, useTheme} from "@mui/material";
import ProfileButton from "../styled/ProfileButton";
import alerts from "../../store/alerts";
import {log} from "util";

const Uuid = () => {


    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText('52q234wrwe-gserg4-greg-34534ge-34535')
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
            <Grid item xs={12} md={2}>
                <Typography
                    variant={'h6'}
                    sx={{
                        mb: 1,
                    }}
                >
                    UUID
                </Typography>
            </Grid>

            <Grid
                item
                xs={12}
				md={10}
                sx={{
					display: 'flex',
					justifyContent: 'space-between',
					columnGap: 1,
                }}
            >
                <Typography
                    id={'uuid'}
                    sx={{
                        /*bgcolor: `${theme.palette.background.accent}`,*/
                        borderRadius: 1,
						p: 1,
						width: '100%',
                        border:  `1px solid ${theme.palette.primary.pale}`,
						fontSize: 13,
						textAlign: 'center'
                    }}
                    onClick={handleUUIDClick}
                >
                    52q234wrwe-gserg4-greg-34534ge-34535
                </Typography>

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