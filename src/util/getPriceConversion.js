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