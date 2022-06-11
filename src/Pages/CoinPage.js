import axios from 'axios'
import React, {useCallback } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import CoinChart from '../components/CoinChart'
import { SingleCoin } from '../config/api'
import { CryptoState } from '../CryptoContext'
import './CoinPage.css'
import parse from 'html-react-parser'

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinPage = () => {
const [coin, setCoin] = useState()
const {id} = useParams()
const {currency, symbol} = CryptoState()

const fetchCoin = useCallback(async () => {
  const {data} = await axios.get(SingleCoin(id))
  setCoin(data)
},[currency, id])

useEffect(() => {
  fetchCoin()
},[fetchCoin])

const description = coin?.description?.en.split('. ')[0]
const slDesc = coin?.description?.en.split('. ')[1]
console.log(coin?.description?.en) 

  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
      <div className='main-info'>
        <img style={{width:'8em', marginBottom:'2rem'}} src={coin?.image?.large} />
        <h1>{coin?.name}</h1>
        <h2 style={{marginTop:'1em'}}>Price: {symbol} {coin&& numberWithCommas(currency==='EUR'? coin?.market_data?.current_price?.eur: coin?.market_data?.current_price?.usd)}</h2>
        <h3 style={{textAlign:'justify', margin:'1em 5rem 1em 5rem', padding:'1em', borderBottom:'1px solid gold'}}>{coin && parse(`${description}. ${slDesc}`)}.</h3>
      </div>
      <CoinChart coin={coin}/>
    </div>
  )
}

export default CoinPage