import { Toolbar } from '@mui/material'
import { Container } from '@mui/material'
import { MenuItem } from '@mui/material'
import { Select } from '@mui/material'
import { createTheme, ThemeProvider  } from '@mui/material/styles'
import { AppBar } from '@mui/material'
import { Typography } from '@mui/material'
import { makeStyles} from '@mui/styles'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CryptoState } from '../CryptoContext'

const useStyles = makeStyles( () => ({
    title: {
        flex:1,
        color:'gold',
        fontFamily:'Inter',
        fontWeight:'bold',
        cursor:'pointer',
    },
    container: {
        borderBottom:'solid gold 0.7px'
    }
}))

const darkTheme = createTheme({
    palette: {
      primary: {
          main: '#fff'
      },
      mode: 'dark'
    },
  })

const Header = () => {

const classes = useStyles()
const navigate = useNavigate()
const {currency, symbol, setCurrency} = CryptoState()

  return (
    <ThemeProvider theme={darkTheme}>
    <AppBar className={classes.container} color='transparent' position='static'>
        <Container >
            <Toolbar>
                <img style={{width:'22px'}} src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Zlatni_Ljiljan.svg/1531px-Zlatni_Ljiljan.svg.png'/>
                <Typography 
                    variant='h4'
                    onClick={() => navigate('/')}
                    className={classes.title} 
                    style={{fontWeight:'bold'}}>
                    Crypto.ba
                </Typography>
                <Select 
                variant='outlined' 
                style={{
                    width:'100', 
                    height:'40', 
                    marginRight:'15'}}
                value = {currency}
                onChange={(e)=> setCurrency(e.target.value)}
                    >
                    <MenuItem value={'USD'}>USD</MenuItem>
                    <MenuItem value={'EUR'}>EUR</MenuItem>
                </Select>
            </Toolbar>
        </Container>
    </AppBar>
    </ThemeProvider>
  )
}

export default Header