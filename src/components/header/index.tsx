import { Link } from 'react-router-dom'
import { FiShoppingCart } from 'react-icons/fi'
import { useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'

export function Header(){
	const {cartAmount} = useContext(CartContext)
	return(
		<header className="bg-blue-600 text-white py-4 px-6 shadow-md">
			<nav className="max-w-6xl mx-auto flex justify-between items-center">
				<Link className="text-2xl font-bold" to="/">
					🐾 PetShop
				</Link>
				
				<Link className="relative" to="/cart">
					<FiShoppingCart size={24} color="#fff"/>
					{cartAmount > 0 && (
						<span className="absolute -top-3 -right-3.5 px-1 bg-white text-blue-600 font-bold px-2 rounded-full">
						{cartAmount}
					</span>
					)}
					
				</Link>
			</nav>
		</header>						
	)
}