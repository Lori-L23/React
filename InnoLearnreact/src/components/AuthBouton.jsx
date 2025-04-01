import { useAuth } from '../context/AuthContext';

function AuthButton() {
  const { user, login, logout } = useAuth();

  return (
    <div>
      {user ? (
        <>
          <span className='p-4 '>Connecté en tant que {user.name}</span>
          <button className='m-2 bg-red-500 text-white' onClick={logout}>Déconnexion</button>
        </>
      ) : (
        <button className='bg-blue-500 text-white m-4' onClick={() => login({ name: 'Lori Love', email: 'lori@example.com' })}>
          Connexion
        </button>
      )}
    </div>
  );
}
export default AuthButton;