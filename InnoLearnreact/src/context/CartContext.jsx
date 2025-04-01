import { createContext, useContext, useReducer } from 'react';
import { cartReducer, CART_ACTIONS } from '../reducers/CartReducer';

const CartContext = createContext();

export function CartProvider({ children }) {
  // Initialisation du reducer avec un panier vide
  const [cart, dispatch] = useReducer(cartReducer, []);

  // Fonctions d'aide
  const addItem = (item) => {
    dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: item });
  };

  const removeItem = (itemId) => {
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: { id: itemId } });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  // Calcul du total
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const value = {
    cart,
    total,
    addItem,
    removeItem,
    clearCart,
    itemCount: cart.reduce((count, item) => count + item.quantity, 0),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}