import { Typography, TextField, Container } from '@mui/material'
import {  makeStyles } from '@mui/styles'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CoinList } from '../config/api'
import { CryptoState } from '../CryptoContext'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress'
import {useNavigate} from 'react-router-dom'
import { Pagination } from '@mui/material'

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinsTable = () => {

const [coins, setCoins] = useState([])
const [loading, setLoading] = useState(false)
const [search, setSearch] = useState('')
const [page, setPage] = useState(1)
const {currency, symbol} = CryptoState()
const navigate = useNavigate()

 const darkTheme = createTheme({
        palette: {
          primary: {
              main: '#EEBC1D'
          },
          mode: 'dark'
        },
      })   

const fetchCoinList = async (currency) => {
    setLoading(true)
    const {data} = await axios.get(CoinList(currency))
    setCoins(data)
    setLoading(false)
}
console.log(coins)
console.log(search)

useEffect(() => {
    fetchCoinList(currency)
},[currency])

const handleSearch = () => {
  return coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search) ||
      coin.symbol.toLowerCase().includes(search)
  );
};

const useStyles = makeStyles({
  row: {
    backgroundColor: "#16171a",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#131111",
    },
    fontFamily: "Montserrat",
  },
  pagination: {
    "& .MuiPaginationItem-root": {
      color: "gold",
    }
  },
});

const searchHandler= (e) => {
if (e.target.value.length>2)
  setSearch(e.target.value)
  else if (e.target.value ==0) setSearch('')
}


const classes = useStyles()

  return (
    <ThemeProvider theme={darkTheme}>
        <Container style={{textAlign:'center'}}>
            <Typography
            variant='h4'
            style={{margin:18, fontFamily:'Montserrat'}}
            >
               Prices of cryptocurrencies by Market Cap     
            </Typography>
            <TextField 
            label ='Search cryptocurrencies:' 
            color='primary'
            variant='outlined'
            style={{ marginBottom: 20, width: "100%", color:'black',borderRadius:'0.2em' }}
            onChange={searchHandler}
            />
            <TableContainer>
              {
                loading? (
                  <LinearProgress style={{backgroundColor:'#EEBC1D'}}/>
                ):
                <Table>
                  <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                    <TableRow>
                    {["Valuta", "Cijena", "Promjena u 24h", "Tržišna kapt."].map((head) => (
                      <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                      }}
                      key={head}
                      align={head === "Valuta" ? "left" : "right"}
                      >
                      {head}
                      </TableCell>
                    ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {handleSearch().slice((page-1)*10, (page-1)*10 + 10).map((row) => {
                     const profit = row.price_change_percentage_24h > 0
                    return (
                      <TableRow
                      onClick={()=> navigate(`coins/${row.id}`)}
                      className={classes.row}
                      key={row.name}
                      >
                        <TableCell 
                        component='th'
                        scope='row'
                        style={{
                          display:'flex',
                          gap:15
                        }}
                        >
                           <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                                color:'#EEBC1D'
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell 
                        align="right"
                        style={{color:'#d8d8d8', fontWeight:'bold', fontSize:'1rem'}}
                        >
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red", fontWeight:'bold', fontSize:'1rem',
                          }}
                        >
                          {profit && "+"}
                          {numberWithCommas(row.price_change_percentage_24h.toFixed(2))}%
                        </TableCell>
                        <TableCell 
                        align="right"
                        style={{color:'#d8d8d8', fontWeight:'bold', fontSize:'1rem'}}
                        >
                          {symbol}{" "}
                          {numberWithCommas(row.market_cap.toString().slice(0, -6))}
                          M
                        </TableCell>
                      </TableRow>
                       )
                     })}
                  </TableBody>
                </Table>
              }
              </TableContainer> 
              <Pagination 
              onChange={(_,value) => {
                setPage(value);
                window.scroll(0, 450);
              }}
              size='large'
              sx={{
                padding: 4,
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
              classes={{ ul: classes.pagination }}
              count={10}/>
        </Container>
    </ThemeProvider>
  )
}

export default CoinsTable