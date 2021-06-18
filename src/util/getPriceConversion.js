import axios from 'axios'

export const getPriceConversion = async (course) => {
  const response = await axios.get('https://ipapi.co/json/')

  console.log(course);

  const options = {
    method: 'GET',
    url: 'https://currency-exchange.p.rapidapi.com/exchange',
    params: { to: response.data.currency, from: 'USD', q: '1' },
    headers: {
      'x-rapidapi-key': '37ca921f40msh20f90334228d804p14c436jsn8fdd5a938611',
      'x-rapidapi-host': 'currency-exchange.p.rapidapi.com'
    }
  }

  const resp = await axios.request(options)


  let price = Math.round(resp.data * course.price)
  return { currency: response.data.currency, amount:price }
}



export const getPriceConversionFromSEK = async (course) => {
  const response = await axios.get('https://ipapi.co/json/')

  //console.log(course);
  const fromCurrency = 'SEK'
  const toCurrency = response.data.currency
  const query = fromCurrency + '_' + toCurrency
  const apiKey = '6068a971e6754bdf9d3b0ddc706779b0'

    const url= 'https://api.currconv.com/api/v7/convert?q=' +
    query +
    '&compact=ultra&apiKey=' +
    apiKey

    const resp = await axios.get(url)
    const amount = resp.data[query]
 
//console.log(amount);
return [amount,toCurrency]
 


 // let price = Math.round(resp.data * course.price)
 // return { currency: response.data.currency, amount:price }
}