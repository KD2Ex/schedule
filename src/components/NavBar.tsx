import React from 'react'
import { Box, Container, Link, Button, Stack, AppBar, Toolbar, Tabs, Tab } from '@mui/material'
import {Link as link} from 'react-router-dom';
import { useTheme } from '@mui/material/styles';



function NavBar() {

  return (

    <AppBar position='static'>
      <Toolbar sx={{
            ml: '60px',
            spacing: 3,
          }}>
          
          <Button component={link} to="/" sx={{color: '#fff', fontWeight: 'light'}} >
              Расписание
            </Button>
            <Button component={link} to="/" sx={{color: '#fff', fontWeight: 'light'}}>
              Профиль
            </Button>
        
      </Toolbar>
    </AppBar>
    /*
    <Tabs textColor="inherit"  sx={{
            ml: '100px',
            fontWeight: 'light',
            
          }}>
          <Tab  component={link} to="/" label='Shedule'/>
          <Tab component={link} to="/" label='Profile'/>
        </Tabs>

    <Container sx={{
       bgcolor: "primary.main", 
       display: 'flex',
       height: 75, 
       m<: 0, 
       p: 0, 
       alignItems: 'center',
       gap: 4
       }} maxWidth={false}>
        <Stack direction='row' spacing={2}>
        
        </Stack>
         
    </Container>*/
  )
}

export default NavBar