import axios from 'axios'

export const getKarnaOrderLines = async (course) => {
 
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true
    }
  }
  const resp = await axios.get(
    'https://free.currconv.com/api/v7/convert?q=USD_SEK&compact=ultra&apiKey=077ab08d433eb54aab69',
    {},
    config
  )

  //console.log(Math.round(resp.data['USD_' + currency] * course.price))
  let price = Math.round(resp.data['USD_SEK'] * course.price)
  let amount = price * 100

  const data = {
    purchase_country: 'SE',
    purchase_currency: 'SEK',
    locale: 'sv-SE',
    order_amount: amount,
    order_lines: [
      {
        name: 'course',
        quantity: 1,
        quantity_unit: 'pcs',
        unit_price: amount,
        total_amount: amount
      }
    ],

    merchant_urls: {
      terms: process.env.REACT_APP_HOST + '/privacy',
      confirmation:
        process.env.REACT_APP_HOST + '/confirmation-klarna/' + course._id
    }
  }
  return data
}
