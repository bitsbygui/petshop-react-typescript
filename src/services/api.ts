import axios from 'axios'

export const api = axios.create({
	baseURL: "https://petshop-api-alpha.vercel.app/products"
})
