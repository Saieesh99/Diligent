import { DEFAULT_CURRENCY } from "../common/constants.js";
import fetch, { Headers } from 'node-fetch';

let myHeaders = new Headers();
myHeaders.append("apikey", process.env.CURRENCY_CONVERTER_TOKEN);
let requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
};

export async function getPriceByCurrency(product, reqCurrency) {
    let currency = product.Currency;
    let price = product.Price;
    if (reqCurrency != null) {
        if ((reqCurrency && (reqCurrency != currency)) || (currency != DEFAULT_CURRENCY)) {
            let toCurrency = (reqCurrency) ? reqCurrency : currency;
            let fromCurrency = (currency != reqCurrency) ? currency : reqCurrency;
            const response = await fetch(`https://api.apilayer.com/currency_data/convert?to=${toCurrency}&from=${fromCurrency}&amount=${price}`, requestOptions);
            const data = await response.json();
            if (data.success) {
                price = data.result;
            }
            return { price, toCurrency };
        }
    } else {
        return { price, toCurrency: currency };
    }
}





