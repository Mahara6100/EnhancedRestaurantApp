// context/CartContext.js

import {createContext, useState} from 'react'

const CartContext = createContext()

export const CartProvider = ({children}) => {
  const [cartList, setCartList] = useState([])

  // 🔼 Add item to cart (if exists, increase quantity)
  const addCartItem = item => {
    const existingItem = cartList.find(dish => dish.dish_id === item.dish_id)

    if (existingItem) {
      setCartList(prev =>
        prev.map(dish =>
          dish.dish_id === item.dish_id
            ? {...dish, quantity: dish.quantity + item.quantity}
            : dish,
        ),
      )
    } else {
      setCartList(prev => [...prev, {...item, quantity: item.quantity}])
    }
  }

  // ❌ Remove item completely
  const removeCartItem = id => {
    setCartList(prev => prev.filter(dish => dish.dish_id !== id))
  }

  // ➕ Increase item quantity
  const incrementCartItemQuantity = id => {
    setCartList(prev =>
      prev.map(dish =>
        dish.dish_id === id ? {...dish, quantity: dish.quantity + 1} : dish,
      ),
    )
  }

  // ➖ Decrease item quantity or remove if zero
  const decrementCartItemQuantity = id => {
    setCartList(prev =>
      prev
        .map(dish =>
          dish.dish_id === id ? {...dish, quantity: dish.quantity - 1} : dish,
        )
        .filter(dish => dish.quantity > 0),
    )
  }

  // 🚮 Remove all items
  const removeAllCartItems = () => {
    setCartList([])
  }

  return (
    <CartContext.Provider
      value={{
        cartList,
        addCartItem,
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        removeAllCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartContext
