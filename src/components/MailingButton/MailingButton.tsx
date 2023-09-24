import React, {FC, ReactNode, useEffect, useState} from 'react';
import ProfileButton from "../styled/ProfileButton";
import {SocialType} from "../../models/types/SocialType";
import user from "../../store/user";
import {observer} from "mobx-react-lite";
import alerts from "../../store/alerts";


interface MailingButtonProps {
    children: ReactNode,
    type: SocialType
}

const MailingButton: FC<MailingButtonProps> = ({type}) => {

    const social = user.profile.linkedSocial.find(item => item.type === type);
    const [mailing, setMailing] = useState(social?.enabledMailing);
    const [enabled, setEnabled] = useState(social?.contain);

    //console.log(user.profile)
    console.log(enabled)

    const handleMailing = async () => {

        setMailing(prev => !prev);

        await user.updateMailing(type);

    }

    useEffect(() => {

        const contain = user.profile.linkedSocial.find(item => item.type === type)?.contain;

        setEnabled(contain)

        if (!contain) {
            setMailing(false);
        }

    }, [user.profile.linkedSocial.find(item => item.type === type)?.contain])

    return (
        <>
            <ProfileButton
                onClick={handleMailing}
                disabled={!enabled}
                sx={{
                    display: mailing ? 'none' : 'flex',
                    flexWrap: 'nowrap'
                }}
            >
                Включить расслыку {type}
            </ProfileButton>
            <ProfileButton
                onClick={handleMailing}
                sx={{
                    display: mailing ? 'flex' : 'none',
                }}
            >
                Отключить расслыку {type}
            </ProfileButton>
        </>
    );
};

export default observer(MailingButton);