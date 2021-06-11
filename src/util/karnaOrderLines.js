import axios from 'axios'

export const getKarnaOrderLines = async (course) => {
  const response = await axios.get('https://ipapi.co/json/')

  const locales = {
    AT: 'de-AT',
    DK: 'da-DK',
    FI: 'fi-FI',
    DE: 'de-DE',
    NL: 'nl-NL',
    NO: 'nb-NO',
    SE: 'sv-SE',
    CH: 'de-CH',
    GB: 'en-GB',
    US: 'en-US',
    AU: 'en-AU',
    BE: 'nl-BE',
    ES: 'es-ES',
    IT: 'it-IT'
  }



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

 
  let amount = price * 100

  

  const data = {
    purchase_country: response.data.country,
    purchase_currency: response.data.currency,
    locale: locales[response.data.country],
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