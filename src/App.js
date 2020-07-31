import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import data from './data';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

//ContextAPI
import CartContext from "./contexts/CartContext"
import ProductContext from "./contexts/ProductContext"

//CustomHooks
import { useLocalStorage } from './hooks/useLocalStorage'

function App() {
	const [products] = useState(data);
	const [cart, setCart] = useState([]);
	const [firstRender, setFirstRender] = useState(true)
	const [localStorageContent, setLocalStorageContent] = useLocalStorage('CartValues','')

	const addItem = item => {
		setCart([...cart, item])
		
	};

	const removeItem = id => {
		setCart(
			cart.filter(el => {
				return el.id != id
			})
		)

	}
useEffect(() => {
	if(firstRender) {
		if(localStorageContent) {
			setCart(localStorageContent)
		}
		setFirstRender(false)
	} else {
		setLocalStorageContent(cart)
	}
},[cart])


	return (
		<div className="App">
			<CartContext.Provider value={{cart, removeItem}}>
				<Navigation />
		

			{/* Routes */}
			<ProductContext.Provider value={{products, addItem}}>
				<Route exact path="/">
					<Products />
				</Route>
			</ProductContext.Provider>
				<Route path="/cart">
					<ShoppingCart />
				</Route>
			</CartContext.Provider>
		</div>
	);
}

export default App;
