import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    List,
    ListItemButton,
    OutlinedInput,
    Pagination,
    TextField,
    Tooltip,
    Typography, useMediaQuery, useTheme
} from "@mui/material";
import UserList from "../../components/UserList/UserList";
import ContainedButton from "../../components/styled/ContainedButton";
import user from "../../store/user";
import role from "../../store/role";

export const loader = async () => {
    await role.fetchRoles();
    return null
}

const EditUsersPage = () => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    const size = isMobile ? 3 : 7;

    const [value, setValue] = useState('');
    const [list, setList] = useState([]);
    const [page, setPage] = useState(0);
    const [pages, setPages] = useState(Math.ceil(1));

    const handlePageChange = (event, value) => {
        setPage(value - 1)
    }

    const handleSearch = async (e) => {

        e.preventDefault()
        const response = await user.getAllUsers(value, size, 0);

        setList(response.users);
        setPages(Math.ceil(response.totalElements / size))
        setPage(0);
    }

    useEffect(() => {

      /*  const newList = data.filter(item => item.uuid === value
            || item.firstName.includes(value)
            || item.lastName.includes(value)
            || item.patronymic.includes(value)
            || item.group.includes(value)
        );

        setList(newList);
*/


    }, [value])

    useEffect(() => {

        //setList(data.slice((page - 1)  * 10 , (page - 1) * 10 + 10))

        (async () => {

            const response = await user.getAllUsers(value, size, page)

            setList(response.users)
            setPages(Math.ceil(response.totalElements / size))
        })()

        console.log('effect')

    }, [page])



    return (
        <>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1
                }}
            >

                <Typography
                    variant={'h4'}
                    sx={{
                        fontWeight: 600
                    }}
                >
                    Пользователи

                </Typography>

                <Typography>
                    Введите UUID пользователя и нажмите "Подтвердить" для подтверждения ФИО
                    и предоставления дополнительных функций
                </Typography>


                <Box
                    sx={{
                        '& form': {
                            display: 'flex',
                            alignItems: 'baseline',
                            justifyContent: 'flex-start',
                            gap: 1
                        }
                    }}
                >
                    <form
                        onSubmit={handleSearch}
                    >
                        <TextField
                            label="Поиск"
                            size={'small'}
                            variant="outlined"
                            placeholder={'Введите UUID'}
                            sx={{
                                width: '350px',
                                mb: 2
                            }}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />

                        <ContainedButton
                            size={''}
                            sx={{
                                height: '100%'
                            }}
                            type={'submit'}
                            //onClick={handleSearch}
                        >
                            Поиск
                        </ContainedButton>

                        <Button
                            variant={'outlined'}
                            onClick={async () => {
                                setValue('');

                                const response = await user.getAllUsers('', size, 0);

                                setList(response.users);
                                setPages(Math.ceil(response.totalElements / size))
                                setPage(0);
                            }}
                        >

                            Очистить
                        </Button>
                    </form>

                </Box>


                {
                    list.length !== 0
                        ? <UserList
                            data={list}
                        />

                        : value ?
                        <Typography>
                            Пользователи не найдены!
                        </Typography> : null
                }


            </Box>

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    mt: 2,
                }}
            >
                <Pagination
                    count={pages}
                    page={page + 1}
                    onChange={handlePageChange}
                    sx={{
                        '& .MuiButtonBase-root': {
                            color: 'text.union'
                        },
                        '& .MuiPaginationItem-previousNext': {
                            color: 'primary.main'
                        }
                    }}
                />
            </Box>


        </>
    );
};

export default EditUsersPage;