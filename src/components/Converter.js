import React, { useState } from 'react'
import axios from 'axios'

const Converter = () => {
  const [convert, setConvert] = useState([])
  const [currency, setCurrency] = useState('')

  const API_KEY = process.env.REACT_APP_API_KEY

  const fetchRates = async () => {
    try {
      const response = await axios.get(
        `https://freecurrencyapi.net/api/v2/latest?apikey=${API_KEY}&base_currency=USD
       `
      )

      let res = response.data
      // console.log(res.data)

      setConvert(res.data)
      console.log(convert)
    } catch (err) {
      if (err.response) {
        // Not in the 200 response range
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
      } else {
        console.log(`Error: ${err.message}`)
      }
    }
  }

  function baseRate() {
    if (currency === 'NGN') {
      console.log(convert.NGN)
    }

    // let eur = convert.EUR
    // let usd = convert.USD
    // let naira = convert.NGN
  }
  const handleClick = (e) => {
    e.preventDefault()
    fetchRates()
    baseRate()
    console.log(currency)
    console.log(convert.currency)
  }

  return (
    <div className="main">
      <div className="conv">
        <label htmlFor="oamount">Amount to Convert :</label>
        <input
          type="text"
          className="form-control searchBox"
          placeholder="0.00"
          id="oamount"
        />

        <select onChange={(e) => setCurrency(e.target.value)}>
          <option value="select currency">Select currency</option>
          <option value="USD">USD</option>
          <option value="NGN">NGN</option>
          <option value="EUR">EUR</option>
        </select>

        <button onClick={handleClick}> Convert</button>
      </div>
    </div>
  )
}

export default Converter
