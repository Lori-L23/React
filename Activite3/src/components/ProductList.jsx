import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
const products = [
  { id: 1, name: 'T-Shirt', price: 20 },
  { id: 2, name: 'Jean', price: 50 },
  { id: 3, name: 'Chaussures', price: 80 },
];

export default function ProductList() {
  const { cart, addItem, removeItem, total, itemCount } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
      <h2>Produits</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {products.map(product => (
          <li key={product.id} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem',
            marginBottom: '1rem',
            border: '1px solid #dee2e6',
            borderRadius: '4px'
          }}>
            <div>
              <h3 style={{ margin: 0 }}>{product.name}</h3>
              <p style={{ margin: 0 }}>{product.price}€</p>
            </div>
            
            {user && (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => addItem(product)}>+</button>
                <button 
                  onClick={() => removeItem(product.id)}
                  disabled={!cart.some(item => item.id === product.id)}
                >
                  -
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>

      {itemCount > 0 && (
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <button 
            onClick={() => navigate('/checkout')}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Valider mon achat ({total}€)
          </button>
        </div>
      )}
    </div>
  );
}