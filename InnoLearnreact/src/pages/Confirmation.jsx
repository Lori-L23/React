import {  useAuth } from '../context/AuthContext';


export default function Confirmation() {
  const { user } = useAuth();

  return (
    <div className="confirmation-page items-center">
      <h2>Merci pour votre achat, {user?.name} !</h2>
      
      <div className="confirmation-details mr-2">
        <p>Votre commande a bien été enregistrée.</p>
        <p>Un email de confirmation a été envoyé à {user?.email}.</p>
      </div>

      <div className="order-number mt-2 text-['#495057']">
        <p>Numéro de commande : #{Math.floor(Math.random() * 1000000)}</p>
      </div>
    </div>
  );
}