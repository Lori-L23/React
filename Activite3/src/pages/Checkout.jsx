import { useNavigate } from 'react-router-dom';
import { useCart, useAuth } from '../context';

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleConfirm = () => {
    clearCart();
    navigate('/confirmation');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '1rem' }}>
      <h2>Récapitulatif de commande</h2>
      
      <div style={{ 
        backgroundColor: '#f8f9fa',
        padding: '1rem',
        marginBottom: '1rem',
        borderRadius: '8px'
      }}>
        <h3>Articles :</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {cart.map(item => (
            <li key={item.id} style={{ marginBottom: '0.5rem' }}>
              {item.name} x{item.quantity} - {item.price * item.quantity}€
            </li>
          ))}
        </ul>
        
        <div style={{ marginTop: '1rem', fontWeight: 'bold' }}>
          Total : {total}€
        </div>
      </div>

      <div style={{ 
        backgroundColor: '#f8f9fa',
        padding: '1rem',
        marginBottom: '1rem',
        borderRadius: '8px'
      }}>
        <h3>Informations client :</h3>
        <p>Nom : {user?.name || 'Non connecté'}</p>
        <p>Email : {user?.email || 'Non fourni'}</p>
      </div>

      <button 
        onClick={handleConfirm}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '1rem'
        }}
      >
        Confirmer la commande
      </button>
    </div>
  );
}