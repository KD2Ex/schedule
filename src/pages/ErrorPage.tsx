import React from 'react'
import {useRouteError} from 'react-router-dom'
import logo from '../styles/anime.jpg'
import {Stack} from "@mui/material";


function ErrorPage() {
    const error : any = useRouteError();
    console.error(error);

  return (
    <Stack>
        {/*<img style={{width: '100%', height: '100vh'}} src={logo} alt=""/>*/}
        {error}
    </Stack>
  )
}


export default ErrorPage
