import {  useAuth } from '../context/AuthContext';
import {useCart} from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleConfirm = () => {
    // Ici vous pourriez ajouter une logique d'envoi au serveur
    clearCart();
    navigate('/confirmation');
  };

  return (
    <div className="checkout-page">
      <h2>Récapitulatif de commande</h2>
      
      <div className="order-summary">
        <h3>Articles :</h3>
        <ul>
          {cart.map(item => (
            <li key={item.id}>
              {item.name} x{item.quantity} - {item.price * item.quantity}€
            </li>
          ))}
        </ul>
        
        <div className="total-section">
          <strong>Total : {total}€</strong>
        </div>
      </div>

      <div className="user-info bg-[#f8f9fa] p-1 mb-1 border rounded-8">
        <h3>Informations client :</h3>
        <p>Nom : {user?.name || 'Non connecté'}</p>
        <p>Email : {user?.email || 'Non fourni'}</p>
      </div>

      <button 
        onClick={handleConfirm}
        className="confirm-button bg-[#28a745] text-white rounded-4 "
      >
        Confirmer la commande
      </button>
    </div>
  );
}