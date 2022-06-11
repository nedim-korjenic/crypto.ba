import { Typography } from '@mui/material'
import { Container } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import Carousel from './Carousel'

const useStyles = makeStyles( () => ({
  banner : {
      backgroundImage: 'url(./banner.jpg)'
  },
  bannerContent: {
      height:400,
      display:'flex',
      flexDirection:'column',
      paddingTop:25,
      justifyContent:'space-around'
  },
  tagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
}))

const Banner = () => {

const classes = useStyles()

  return (
    <div className={classes.banner}>
        <Container className={classes.bannerContent}>
            <div className={classes.tagline}>
                <Typography
                variant='h2'
                style={{
                    fontWeight:'bold',
                    marginBottom:15,
                    fontFamily:'Montserrat'
                }}
                >
                   Crypto.ba         
                </Typography>
                <Typography
                variant='h5'
                style={{
                    color:'darkgrey',
                    fontFamily:'Montserrat'
                }}
                >
                   Latest news from the Cryptocurrency world.        
                </Typography>
            </div>
            <Carousel/>
        </Container>
    </div>
  )
}

export default Banner
