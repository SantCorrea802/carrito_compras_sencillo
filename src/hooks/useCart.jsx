import { useState } from "react"
import { db } from "../data/db"

const useCart = () =>{

    const MIN_QUANTITY = 1
    const MAX_QUANTITY = 10

    const data = db
    
    const[cart, setCart] = useState([])

    function addToCart(item){
        const itemExists = cart.findIndex(car => car.id === item.id)

        if (itemExists >= 0){
        const updateCart = [...cart]
        updateCart[itemExists].quantity ++
        setCart(updateCart)
        }else{
        item.quantity = 1
        setCart([...cart, item])
        }

    }

    function removeFromCart(idEliminar){
        setCart(cart.filter(car => car.id !== idEliminar))
    }

    function decreaseQuantity(id){
        const updateCart = cart.map(item => {
        if (item.id === id && item.quantity > MIN_QUANTITY){
            return {...item, quantity: item.quantity - 1}
            
        }
        return item
        })
        setCart(updateCart)
    }

    // aumentar cantidad
    function increaseQuantity(id){
        const updateCart = cart.map(item =>{
        if (item.id === id && item.quantity < MAX_QUANTITY){
            return {...item, quantity: item.quantity + 1}
        }
        return item
        })
        setCart(updateCart)
    }

    function clearCart(){
        setCart([])
    }


    const totalCart = cart.reduce((total, item) => {return total +(item.price*item.quantity)},0)
    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        increaseQuantity,
        clearCart,
        totalCart
    }
}

export {useCart}