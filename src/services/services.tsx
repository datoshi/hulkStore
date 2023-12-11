import axios from 'axios';

export const services = () => {
   return axios.get('https://apimocha.com/hulkproducts/getProducts');
}