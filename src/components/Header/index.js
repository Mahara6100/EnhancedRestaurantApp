// components/Header/index.js
import {useHistory} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = ({restaurantName, cartCount}) => {
  const history = useHistory()

  const onClickCart = () => {
    history.push('/cart')
  }

  const onClickLogo = () => {
    history.push('/')
  }

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <header className="header">
      <h1 onClick={onClickLogo} className="logo">
        {restaurantName}
      </h1>
      <div className="header-actions">
        <button
          type="button"
          onClick={onClickCart}
          data-testid="cart"
          className="cart-button"
        >
          🛒 <span>{cartCount}</span>
        </button>
        <button type="button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </header>
  )
}

export default Header
