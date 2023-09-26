import React, {FC, useState} from 'react';
import {Button, Tooltip} from "@mui/material";
import user from "../../store/user";
import alerts from "../../store/alerts";

interface ButtonUserVerifyProps {
    verified: boolean,
    uuid: string
}

const ButtonUserVerify: FC<ButtonUserVerifyProps> = ({verified, uuid}) => {

    const [verify, setVerify] = useState(verified)

    const handleVerify = async () => {
        try {
            await user.verify(uuid);
            alerts.openSuccessAlert('Пользователь подтвержден')
            setVerify(true)
        } catch (e) {

            switch (e.response.data.code) {
                case 1: {
                    alerts.openErrorAlert('Ошибка: UUID отсутствует')
                    break;
                }
                case 2: {
                    alerts.openErrorAlert('Ошибка: Пользователь не существует')
                    break;
                }
                case 3: {
                    alerts.openErrorAlert('Ошибка: ФИО не заполнено')
                    break;
                }
                case 4: {
                    alerts.openErrorAlert('Ошибка: Пользователь уже верифицирован')
                    break;
                }

            }

        }
    }

    const handleUnverify = async () => {

        try {
            await user.removeVerify(uuid);
            alerts.openWarningAlert('Подтверждение снято')
            setVerify(false)
        } catch (e) {
            // ???
        }

    }


    return (
        <>
            {!verify
                ?
                <Button
                    variant={'contained'}
                    onClick={handleVerify}
                    sx={{
                        minWidth: '130px'
                    }}
                >
                    <Tooltip title={'Подвердить пользователя'}>
                        <span>Подвердить</span>

                    </Tooltip>
                </Button>
                :
                <Button
                    variant={'contained'}
                    onClick={handleUnverify}
                    sx={{
                        minWidth: '130px'
                    }}
                >
                    <Tooltip title={'Снять подтверждение с пользователя'}>
                        <span>Отказать</span>

                    </Tooltip>
                </Button>
            }

        </>
    );
};

export default ButtonUserVerify;