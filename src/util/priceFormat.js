 export const getPriceFormat = (price) => {
    let priceFormat = Math.floor(price / 1000)
    priceFormat += ' ' + (price % 1000)

    return priceFormat
  }

