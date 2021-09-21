 export const getPriceFormat = (price) => {
    //console.log(`price in : ${price.toString().length}`);
    if (price.toString().length >3 ){
      console.log('price length : ',price.length);
   
    let priceFormat = Math.floor(price / 1000)
    let mode = price%1000 
    // if the mode less than 3 digits 
    if (mode.toString().length===2){
        mode ='0'+mode;
    }
     // if the mode less than 2 digits 
    if (mode.toString().length===1){
      mode ='00'+mode;
    }

    priceFormat += ' ' + mode
  //console.log(`price out: ${priceFormat}`);
    return priceFormat
    }
    else{
      return price
    }
  }

