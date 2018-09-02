const sym = 'ETH'
const limit = 119 // this will be 120 results


const getHistData = (sym, limit) => {
  const url = `https://min-api.cryptocompare.com/data/histominute?fsym=${sym}&tsym=USD&limit=${limit}`
  const data = fetch(url)
    .then( data => data.json() )
    .then( data => data.Data)
  
  const scale = 100
  return data.then( d => d.map( ({ open, close }) => Math.round((close-open)*scale) ))
}

// getHistData(sym, limit).then( d => console.log(d))
