import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';


const products = [
  { id: 1, name: 'Bouquets de fleurs', price: 100 },
  { id: 2, name: 'Cartes de voeux', price: 250 },
  { id: 3, name: 'Tennis', price: 380 },
];

export default function ProductList() {
  const { cart, addItem, removeItem, total } = useCart();
  const { isAuthenticated } = useAuth();  
  // const navigate = useNavigate();

  return (
    <div>
      <h2 className='text-2xl text-purple-500 font-bold p-4 mt-4 '>Produits</h2>
      <ul className='text-lg text-gray-700 p-4'>
        {products.map(product => (
          <li key={product.id} className='flex justify-between items-center space-y-4'>
            {product.name} - {product.price}€
            {isAuthenticated && (
              <>
                <button className='ml-10 bg-purple-500 text-white' onClick={() => addItem(product)}>Ajouter</button>
                <button className='ml-4 bg-red-500 text-white' 
                  onClick={() => removeItem(product.id)}
                  disabled={!cart.some(item => item.id === product.id)}
                >
                  Retirer
                </button>
              </>
            )}
          </li>
        ))}
      </ul>

      <h3 className='mt-2'>Panier ({cart.length} articles)</h3>
      <ul className='mt-2'>
        {cart.map(item => (
          <li key={item.id}>
            {item.name} x{item.quantity} = {item.price * item.quantity}€
          </li>
        ))}
      </ul>
      
      {cart.length > 0 && (
        <div className="cart-actions">
          <button 
            onClick={() => navigate('/checkout')}
            className="checkout-button text-white bg-green-500 rounded-4 p-2 mt-4"
            disabled={!isAuthenticated}
          >
            Valider mon achat ({total}€)
          </button>
        </div>
         )}
    </div>
  );
}
