import { createContext, useContext, useReducer } from 'react';

// Création du contexte
const CartContext = createContext();

// Actions disponibles
export const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  CLEAR_CART: 'CLEAR_CART',
};

// Reducer pour gérer l'état du panier
function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM:
      const existingItem = state.find(item => item.id === action.payload.id);
      if (existingItem) {
        return state.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];

    case CART_ACTIONS.REMOVE_ITEM:
      return state.filter(item => item.id !== action.payload.id);

    case CART_ACTIONS.CLEAR_CART:
      return [];

    default:
      return state;
  }
}

// Composant Provider exporté directement
export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const addItem = (item) => dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: item });
  const removeItem = (itemId) => dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: { id: itemId } });
  const clearCart = () => dispatch({ type: CART_ACTIONS.CLEAR_CART });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((count, item) => count + item.quantity, 0);

  const value = {
    cart,
    total,
    itemCount,
    addItem,
    removeItem,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Hook personnalisé exporté directement
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}