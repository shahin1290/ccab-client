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

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true
    }
  }
  const resp = await axios.get(
    `https://free.currconv.com/api/v7/convert?q=USD_${response.data.currency}&compact=ultra&apiKey=077ab08d433eb54aab69`,
    {},
    config
  )

  //console.log(Math.round(resp.data['USD_' + currency] * course.price))
  let price = Math.round(
    resp.data[`USD_${response.data.currency}`] * course.price
  )
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
