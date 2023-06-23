import React, {useState} from 'react';
import schedule from "../../store/schedule";
import {Box, Typography} from "@mui/material";

const Bookmarks = ({item}) => {

    const [child, setChild] = useState('')


    const handleAnchor = (item: string) => {

        const element = document.getElementById(item)
        let position = element?.getBoundingClientRect();

        window.scrollTo({
            left: position.left,
            top: position.top + window.scrollY - 50,
            behavior: 'smooth'
        });
    }

    return (
        <>
            <Box
                sx={{
                    bgcolor: 'rgb(13,54,110)',
                    width: '100%',
                    minWidth: '30%',
                    p: 0,
                    pr: 1,
                    pl: 1,
                    borderRadius: 2,
                    mb: 1,
                    fontSize: 15,
                    transition: '300ms',
                    "&:hover": {
                        width: '100%',
                    }

                }}
                onClick={() => handleAnchor(item)}
            >
                <Typography
                    sx={{
                        overflow: 'hidden',
                        color: 'white'
                    }}
                >
                    {item.slice(0, -3)}
                </Typography>
            </Box>
        </>

    );
};

export default Bookmarks;