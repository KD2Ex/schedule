import React from 'react'
import {useRouteError} from 'react-router-dom'



function ErrorPage() {
    const error : any = useRouteError();
    console.error(error);

  return (
    <div>
        Err
        {error.statusText || error.message} 
        

    </div>
  )
}


export default ErrorPage
