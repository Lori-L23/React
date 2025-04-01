import { Link } from 'react-router-dom';
import { useCart, useAuth } from '../context';

export default function Navbar() {
  const { itemCount } = useCart();
  const { user, logout } = useAuth();

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '1rem',
      backgroundColor: '#f8f9fa',
      borderBottom: '1px solid #dee2e6'
    }}>
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <h1>Ma Boutique</h1>
      </Link>
      
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none' }}>Produits</Link>
        {user && (
          <>
            <Link to="/checkout" style={{ textDecoration: 'none' }}>
              Panier ({itemCount})
            </Link>
            <button onClick={logout}>Déconnexion</button>
          </>
        )}
      </div>
    </nav>
  );
}