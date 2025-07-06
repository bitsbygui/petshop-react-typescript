import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext"
import { useNavigate } from "react-router-dom";

export function Cart(){
	const {cart, total, addItemCart, removeItemCart, finishOrder} = useContext(CartContext);

	const navigate = useNavigate();

	function handleFinishOrder(){
		finishOrder();
		navigate("/");
	}
	

	return(
		<div className="w-full max-w-7xl mx-auto ">
			<h1 className="font-medium text-2xl text-center my-4">Meu Carrinho</h1>

			{cart.length === 0 && (
			<div className="flex flex-col items-center justify-center">
				<p className="font-medium">Ops seu carrinho está vazio</p>
				<Link
					to="/"
					className="bg-slate-600 my-3 p-1 px-3 text-white font-medium rounded"
				>
					Acessar produtos
				</Link>
			</div>
			)}

			{cart.map((item) => (
			<section className="flex items-center justify-between border-b-2 border-gray-300">
				<img src={item.cover} alt={item.title} className="w-28 mb-4"/>

				<strong>Preço: {item.price}</strong>

				<div className="flex items-center justify-center gap-3">
					<button
					onClick={()=> removeItemCart(item)}
					className="bg-blue-600 px-2 rounded text-white font-medium flex items-center justify-center">
						-
					</button>

					{item.amount}

					<button 
					onClick={()=> addItemCart(item)}
					className="bg-blue-600 px-2 rounded text-white font-medium flex items-center justify-center">
						+
					</button>

					<strong className="float-right">
						SubTotal:{item.total.toLocaleString("pt-BR", {
							style: "currency",
							currency: "BRL"
						})}
					</strong>

				</div>
			</section>
			))}

			{
			cart.length !== 0 && (
			<>
				<p className="font-bold mt-4">Total: {total}</p>

				<div className="flex justify-center mt-4">
					<button
						onClick={handleFinishOrder}
						className="bg-green-600 text-white font-medium py-2 px-4 rounded hover:bg-green-700 transition"
					>
						Finalizar Compra
					</button>
				</div>
			
			
			</>
			)}











		</div>

	)
}