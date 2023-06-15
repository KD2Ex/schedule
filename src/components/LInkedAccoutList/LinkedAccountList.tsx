import React from 'react';
import {Grid, Typography} from "@mui/material";
import {SettingsBox} from "../styled/SettingsBox";
import LinkedAccount from "../LinkedAccount/LinkedAccount";
import user from "../../store/user";
import {observer} from "mobx-react-lite";

const LinkedAccountList = observer(() => {


    return (
        <>
            <Typography variant={"h4"} sx={{marginBottom: 1}}>
                Привязанные аккаунты
            </Typography>

            <SettingsBox>
                <Grid container spacing={3}>
                    {user.profile.linkedSocial?.map((account, index) => (
                        <Grid item xs={12} key={index}>
                            <LinkedAccount
                                type={account.type}
                                isLinked={account.contain}
                            />
                        </Grid>
                    ))}

                </Grid>
            </SettingsBox>
        </>
    );
});

export default LinkedAccountList;