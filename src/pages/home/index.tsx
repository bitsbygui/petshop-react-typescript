import {useContext, useEffect, useState} from 'react'
import { BsCartPlus } from 'react-icons/bs'
import toast from 'react-hot-toast'

import { api } from '../../services/api'
import { CartContext } from '../../contexts/CartContext';

export interface ProductProps{
	id: number;
	title: string;
	description: string;
	price: number;
	cover: string;
}


export function Home(){
	const {addItemCart} = useContext(CartContext)
	const [products, setProducts] = useState<ProductProps[]>([])

	useEffect (()=> {
		async function getProducts(){
			const response = await api.get("/products")
			setProducts(response.data)
		}

		getProducts();
	}, [])

	function handleAddCartItem(product: ProductProps){
		toast.success("Produto adicionado no carrinho.", {
			style: {
			background: "#2563eb", // azul do Tailwind: bg-blue-600
			color: "#ffffff",
			fontSize: "1.1rem",
			fontWeight: "bold",
			padding: "16px 24px",
			borderRadius: "12px",
			boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)"
			},
		})
		addItemCart(product);
	}


	return(
		<div>
			<main className="w-full max-w-7xl px-4 py-10 mx-auto">
				<h1 className="font-bold text-3xl mb-10 text-gray-800 text-center">Produtos para seu Pet 🐶</h1>


				<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5'>
					{products.map((product) => (
					<section key={product.id} className='w-full bg-white shadow-md rounded-lg p-4 flex flex-col items-center'>
						<img src={product.cover} alt={product.title} className='w-full rounded-lg max-h-70 mb-2'/>
						<p className='text-center font-medium text-md text-gray-700' mb-2>{product.title}</p>

						<div  className="flex justify-between items-center w-full mt-2">
							<strong className="text-xl text-blue-600">
								{product.price.toLocaleString("pt-BR",{
									style: "currency",
									currency: "BRL"
								})}
							
							</strong>
							<button className="bg-blue-500 p-2 rounded hover:bg-blue-600 transition-colors" onClick={()=> handleAddCartItem(product)}>
								<BsCartPlus size={20} color="#fff" />
							</button>
						</div>
					</section>
					))}

				</div>




			</main>
		</div>
	)
}