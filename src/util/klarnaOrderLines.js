export const getKlarnaOrderLines = (course, geoData) => {
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

  let amount = Math.round(geoData.amount * course.price * 100)

  console.log(amount, course);

  const data = {
    purchase_country: geoData.country,
    purchase_currency: geoData.currency,
    locale: locales[geoData.country],
    order_amount: amount,
    order_lines: [
      {
        name: course.name,
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
