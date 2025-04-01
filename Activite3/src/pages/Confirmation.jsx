import { useAuth } from '../context';

export default function Confirmation() {
  const { user } = useAuth();

  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '2rem',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h2>Merci pour votre achat, {user?.name} !</h2>
      
      <div style={{ margin: '2rem 0' }}>
        <p>Votre commande a bien été enregistrée.</p>
        <p>Un email de confirmation a été envoyé à {user?.email}.</p>
      </div>

      <div style={{ 
        marginTop: '2rem',
        fontSize: '1.2rem',
        color: '#495057'
      }}>
        <p>Numéro de commande : #{Math.floor(Math.random() * 1000000)}</p>
      </div>
    </div>
  );
}