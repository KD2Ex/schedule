import React, {useEffect, useState} from 'react';
import {Autocomplete, Button, Grid, TextField, Typography, useMediaQuery, useTheme} from "@mui/material";
import {SettingTypography} from "../../components/styled/SettingTypography";
import TypeButtons from "../../components/TypeButtons";
import {AutocompleteOption} from "../../models/interfaces/IAutocompleteOption";
import ProfileButton from "../../components/styled/ProfileButton";
import styles from "../ProfilePage/ProfilePage.module.css";
import {IScheduleEntity} from "../../models/interfaces/IScheduleEntity";
import {SCHEDULE_ENTITY} from "../../models/enums/SCHEDULE_ENTITY";
import {ScheduleEntityType} from "../../models/enums/ScheduleEntityType";
import ScheduleFilter from "../../components/ScheduleFilter/ScheduleFilter";
import UserService from "../../api/services/UserService";
import user from "../../store/user";
import {setLoadedOption} from "../../utils/setLoadedOption";
import {observer} from "mobx-react-lite";
import alert from "../../store/alerts";

const ScheduleMailing = observer(() => {

    const [filterType, setFilterType] = useState<IScheduleEntity>({title: SCHEDULE_ENTITY.GROUP, value: ScheduleEntityType.GROUP});
    const [filterValue, setFilterValue] = useState<AutocompleteOption | null>(null);
    const [isMailingActive, setIsMailingActive] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down( 'sm'))
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'))


    const filterLetter = filterType.value === ScheduleEntityType.GROUP
        ? 'а'
        : filterType.value === ScheduleEntityType.TEACHER
            ? 'ь'
            : 'я'

    const handleMailingOn = () => {
        setIsMailingActive(true);
    }

    const handleMailingOff = () => {
        setIsMailingActive(false);
    }

    const handleLinkSchedule = async () => {
        await UserService.setLinkedSchedule(ScheduleEntityType.TEACHER, -1);
        if (filterValue !== null) {
            await UserService.setLinkedSchedule(filterType.value, filterValue?.id);
        } else {
            //await UserService.setLinkedSchedule(ScheduleEntityType.TEACHER, -1);
        }

        alert.openSuccessAlert('Настройки профиля обновлены')

    }
    const handleClearLinkedSchedule = () => {
        setFilterValue(null);
    }

    useEffect(() => {
        (async () => {
            if (user.profile.linkedSchedule.contain) {
                console.log('mailing')

                const newFilterType = user.profile.linkedSchedule.linkedEntityType;
                setFilterType({value: newFilterType, title: SCHEDULE_ENTITY[newFilterType]})
                setFilterValue(await setLoadedOption(user.profile.linkedSchedule.linkedEntityType,
                    user.profile.linkedSchedule.linkedEntityId))
            }
        })()

    }, [])

    return (
        <>
            <Grid item container sm={7} lg={8} xl={6} xs={12} spacing={2}>

                <Grid item xs={12}>
                    <Typography sx={{
                        fontSize: 18,
                    }}>
                        Выберите, какое расписание вы хотите получать:
                    </Typography>
                </Grid>


                <Grid item xs={12} md={4}>

                    <SettingTypography>
                        Тип расписания
                    </SettingTypography>

                </Grid>
                <Grid item xs={12} md={8} sx={{justifyContent:'flex-start', display: 'flex'}}>
                    <TypeButtons
                        filterType={filterType}
                        setFilterType={setFilterType}
                        setFilterValue={setFilterValue}
                        exclusive
                        size='small'
                        orientation={isMobile ? 'vertical' : 'horizontal'}

                    />
                </Grid>


                <Grid item xs={12} md={4}>

                    <SettingTypography>
                        {filterType.title.slice(0, -1) + filterLetter}
                    </SettingTypography>

                </Grid>
                <Grid item xs={12} md={8} sx={{
                    display: 'flex',
                    justifyContent: 'flex-start'
                }}>

                    <ScheduleFilter
                        setFilterValue={setFilterValue}
                        filterType={filterType}
                        filterValue={filterValue}
                    />

                </Grid>
            </Grid>

            {/*<Grid item xs={0}>
<Box>
								<Divider sx={{
									width: '100%',
									height: '100%',
								}} orientation={'vertical'}
								/>
							</Box>
						</Grid>*/}



            <Grid item container xs={12} sm={5} lg={3} spacing={2}
                  sx={isTablet && {
                      display: 'flex',
                      alignContent: 'start'
                  }}
            >


                <Grid item xs={12} sx={{
                    height: '35px'
                }}>
                    <Typography sx={{
                        fontSize: 18,
                    }}>
                        Рассылка
                    </Typography>
                </Grid>

                <Grid item xs={12}>

                    <ProfileButton
                        onClick={handleMailingOn}
                        sx={{display: isMailingActive ? 'none' : 'flex'}}
                    >
                        Включить расслыку
                    </ProfileButton>
                    <ProfileButton
                        onClick={handleMailingOff}
                        sx={{display: isMailingActive ? 'flex' : 'none'}}
                    >
                        Отключить расслыку
                    </ProfileButton>
                </Grid>

                <Grid item xs={12}>

                    <div className={styles.vk_button} id="vk_allow_messages_from_community">

                    </div>
                </Grid>
            </Grid>

            <Grid item xs={12} sx={{gap: 2, display: 'flex', justifyContent: 'flex-end'}}>
                <Button
                    variant={'contained'}
                    sx={{width: '180px', bgcolor: theme.palette.secondary.main, color: 'white',
                        border:`1px solid ${theme.palette.primary.pale}`,
                        '&:hover': {bgcolor: theme.palette.secondary.hover}
                    }}

                    onClick={handleLinkSchedule}

                >
                    Сохранить
                </Button>
                <Button
                    variant={'outlined'}
                    sx={{width: '100px'}}
                    onClick={handleClearLinkedSchedule}
                >
                    Очистить
                </Button>
            </Grid>

        </>
    );
});

export default ScheduleMailing;