import React from 'react';
import {Box, Skeleton} from "@mui/material";



const ScheduleSkeleton = () => {

    return (
        <Box
			sx={{
            '& span': {
                '&::after': {
                    /*bgcolor: 'rgba(65,64,64,0.63)',*/
             /*       background: 'linear-gradient( 90deg, transparent,rgba(65,64,64,0.63), transparent )'*/
                }
            },
            /*bgcolor: 'rgba(33,32,32,0.63)',*/
            bgcolor: (theme) => theme.palette.background.block,
            p: 2,
            pt: 1,
            borderRadius: 2
        }}>
            <Skeleton
                animation={'wave'}
                variant={'text'}
                width={'25%'}
                height={40}
            />
           {/* <Skeleton animation={'wave'} variant={'rounded'} width={'100%'} height={250}/>*/}

            {[1,2,3,4,5,6].map((item, index) => (
				<Skeleton
					key={item}
					animation={'wave'}
					variant={'text'}
					width={'100%'}
					height={30}/>

            ))}


         {/*   <Box sx={{
                display: 'flex',
                gap: 2
            }}>
                <Skeleton variant={'rounded'} width={'10%'} height={30}/>
                <Skeleton variant={'rounded'} width={'20%'} height={30}/>
                <Skeleton variant={'rounded'} width={'50%'} height={30}/>
                <Skeleton variant={'rounded'} width={'25%'} height={30}/>

            </Box>

            {[3,2,2,2,2].map(item => (
                <Box sx={{
                    display: 'flex',
                    gap: 2
                }}>
                    <Skeleton variant={'text'} width={'100%'} height={30}/>

                </Box>
            ))}*/}
        </Box>
    );
};

export default ScheduleSkeleton;