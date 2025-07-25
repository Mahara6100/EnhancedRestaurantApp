// components/Cart/index.js
import {useContext} from 'react'
import {useHistory} from 'react-router-dom'
import CartContext from '../../context/CartContext'
import './index.css'

const Cart = () => {
  const history = useHistory()

  const onClickLogo = () => {
    history.push('/')
  }

  const {
    cartList,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    removeCartItem,
    removeAllCartItems,
  } = useContext(CartContext)

  const renderEmptyCart = () => (
    <div className="empty-cart">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
        alt="empty cart"
      />
      <h2>Your cart is empty</h2>
      <button type="button" onClick={onClickLogo}>
        Go To Home
      </button>
    </div>
  )

  return (
    <div className="cart-container">
      <header className="header">
        <h1>Cart</h1>
        <button type="button" onClick={removeAllCartItems}>
          Remove All
        </button>
      </header>
      {cartList.length === 0 ? (
        renderEmptyCart()
      ) : (
        <ul className="cart-list">
          {cartList.map(item => (
            <li key={item.dish_id} className="cart-item">
              <img src={item.dish_image} alt={item.dish_name} />
              <div>
                <h3>{item.dish_name}</h3>
                <p>
                  ₹{item.dish_price} × {item.quantity} = ₹
                  {(item.dish_price * item.quantity).toFixed(2)}
                </p>
                <div className="quantity-controls">
                  <button
                    type="button"
                    onClick={() => decrementCartItemQuantity(item.dish_id)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => incrementCartItemQuantity(item.dish_id)}
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  className="remove-button"
                  onClick={() => removeCartItem(item.dish_id)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Cart
