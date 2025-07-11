import { createContext, ReactNode, useState } from "react"
import {ProductProps} from '../pages/home'
import toast from "react-hot-toast";

interface CartContextData {
    cart: CartProps[];
    cartAmount:number;
    addItemCart: (newItem: ProductProps) => void;
    removeItemCart: (product: CartProps) => void;
    total: string;
    finishOrder: () => void;

}

interface CartProps{
    id: number;
    title: string;
    description: string;
    price: number;
    cover: string;
    amount: number;
    total: number;


}

interface CartProviderProps{
    children: ReactNode;
}

export const CartContext = createContext({} as CartContextData)

function CartProvider({ children}: CartProviderProps){
    const [cart, setCart] = useState<CartProps[]>([])
    const [total, setTotal] = useState("");

    function addItemCart(newItem: ProductProps){
        const indexItem = cart.findIndex(item => item.id === newItem.id)

        if (indexItem !== -1){
            const cartList = cart;
            cartList[indexItem].amount = cartList[indexItem].amount + 1;
            cartList[indexItem].total = cartList[indexItem].amount * cartList[indexItem].price;

            setCart(cartList)
            totalResultCart(cartList)
            return;
        }


        // adicionar esse item na nossa lista

        const data = {
            ...newItem,
            amount: 1,
            total: newItem.price
        }

        setCart(products => [...products, data])
        totalResultCart([...cart, data])

    }

    function removeItemCart(product: CartProps){
        const indexItem = cart.findIndex(item => item.id === product.id)

        if(cart[indexItem]?.amount > 1){
            const cartList = cart;
            cartList[indexItem].amount = cartList[indexItem].amount -1;
            cartList[indexItem].total = cartList[indexItem].total - cartList[indexItem].price;

            setCart(cartList);
            totalResultCart(cartList)
            return;
        }

        const removeItem = cart.filter(item => item.id !== product.id)
        setCart(removeItem);
        totalResultCart(removeItem)
    }

    function totalResultCart(items: CartProps[]){
        const myCart = items;
        const result = myCart.reduce((acc, obj)=>{return acc + obj.total}, 0)

        const resultFormated = result.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})
        setTotal(resultFormated);

    }

    function finishOrder(){
        setCart([]); // esvazia o carrinho
        setTotal("");
        toast.success('Compra finalizada com sucesso! 🛒', {
            style: {
                background: '#4ade80',         // verde claro
                color: '#1f2937',              // quase preto (cinza escuro)
                fontSize: '1.2rem',
                fontWeight: 'bold',
                padding: '16px 24px',
                borderRadius: '12px',
                boxShadow: '0px 4px 12px rgba(0,0,0,0.2)'
            },
            icon: '🎉',
            duration: 4000,
            position: 'top-center'
        });
    }

    




    return(
        <CartContext.Provider value ={{cart, cartAmount: cart.length, addItemCart, removeItemCart, total, finishOrder}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;