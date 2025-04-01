// Actions possibles
export const CART_ACTIONS = {
    ADD_ITEM: 'ADD_ITEM',
    REMOVE_ITEM: 'REMOVE_ITEM',
    CLEAR_CART: 'CLEAR_CART',
  };
  
  // Reducer
  export function cartReducer(state, action) {
    switch (action.type) {
      case CART_ACTIONS.ADD_ITEM:
        // Vérifie si l'article existe déjà
        const existingItem = state.find(item => item.id === action.payload.id);
        
        if (existingItem) {
          // Incrémente la quantité si déjà présent
          return state.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        // Ajoute un nouvel article avec quantité 1
        return [...state, { ...action.payload, quantity: 1 }];
  
      case CART_ACTIONS.REMOVE_ITEM:
        return state.filter(item => item.id !== action.payload.id);
  
      case CART_ACTIONS.CLEAR_CART:
        return [];
  
      default:
        return state;
    }
  }