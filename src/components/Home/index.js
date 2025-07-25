// components/Home/index.js

import {useEffect, useState, useContext} from 'react'
import CartContext from '../../context/CartContext'
import Header from '../Header'
import './index.css'

const dishesApiUrl =
  'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'

const Home = () => {
  const [data, setData] = useState(null)
  const [activeCategory, setActiveCategory] = useState('')
  const [quantities, setQuantities] = useState({})

  const {cartList, addCartItem} = useContext(CartContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(dishesApiUrl)
        const json = await response.json()
        console.log('API response:', json)

        if (!Array.isArray(json) || json.length === 0) {
          console.error('Invalid API response:', json)
          return
        }

        const restaurantData = json[0]
        setData(restaurantData)

        const initialQuantities = {}
        restaurantData.table_menu_list.forEach(category =>
          category.category_dishes.forEach(dish => {
            initialQuantities[dish.dish_id] = 0
          }),
        )
        setQuantities(initialQuantities)
        setActiveCategory(restaurantData.table_menu_list[0].menu_category)
      } catch (error) {
        console.error('Fetch error:', error)
      }
    }

    fetchData()
  }, [])

  const handleIncrement = id => {
    setQuantities(prev => ({...prev, [id]: prev[id] + 1}))
  }

  const handleDecrement = id => {
    setQuantities(prev => ({...prev, [id]: Math.max(prev[id] - 1, 0)}))
  }

  if (!data) {
    return <h2 style={{color: 'orange'}}>Loading restaurant data...</h2>
  }

  const currentCategory = data.table_menu_list.find(
    cat => cat.menu_category === activeCategory,
  )

  if (!currentCategory) {
    return <h3>No menu category selected.</h3>
  }

  const cartCount = cartList.reduce((total, item) => total + item.quantity, 0)

  return (
    <div className="home-container">
      <Header restaurantName={data.restaurant_name} cartCount={cartCount} />

      <div className="tabs-container">
        {data.table_menu_list.map(category => (
          <button
            key={category.menu_category}
            type="button"
            className={`tab-button ${
              category.menu_category === activeCategory ? 'active' : ''
            }`}
            onClick={() => setActiveCategory(category.menu_category)}
          >
            {category.menu_category}
          </button>
        ))}
      </div>

      <div className="dishes-container">
        {currentCategory.category_dishes.map(dish => {
          const quantity = quantities[dish.dish_id]
          const hasCustomizations = dish.addonCat?.length > 0
          const isAvailable = dish.dish_Availability

          return (
            <div key={dish.dish_id} className="dish-card">
              <h1>{dish.dish_name}</h1>
              <p>
                {dish.dish_currency}
                {dish.dish_price}
              </p>
              <p>{dish.dish_description}</p>
              <p>{dish.dish_calories} Calories</p>
              <img
                src={dish.dish_image}
                alt={dish.dish_name}
                className="dish-image"
              />
              {hasCustomizations && <p>Customizations available</p>}

              <div className="quantity-controls">
                {isAvailable ? (
                  <>
                    <button
                      type="button"
                      onClick={() => handleDecrement(dish.dish_id)}
                    >
                      -
                    </button>
                    <p>{quantity}</p>
                    <button
                      type="button"
                      onClick={() => handleIncrement(dish.dish_id)}
                    >
                      +
                    </button>
                  </>
                ) : (
                  <p>Not Available</p>
                )}
              </div>

              {isAvailable && quantity > 0 && (
                <button
                  type="button"
                  className="add-cart-btn"
                  onClick={() => addCartItem({...dish, quantity})}
                >
                  ADD TO CART
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home
