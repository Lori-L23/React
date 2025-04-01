import React, {useState} from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import AuthButton from './components/AuthBouton';
import ProductList from './components/ProductList';
import './App.css';
// import  {Checkout} from './pages/Affichage';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import {Navbar}  from './components/Navbar';
// import { Confirmation }  from './pages/Confirmation';





/*function Apptest() {


  
  // Déclare une variable d'état 'nom' avec la valeur initiale 'Formateur'
  // et une fonction 'setNom' pour mettre à jour cette variable.

  const [nom, setNom] = useState('Formateur');

  // Fonction qui change la valeur de 'nom' entre 'Formateur' et 'Laila'
  const handleNomChange = () => {
    // Si 'nom' est 'Formateur', le change en 'Laila', sinon le change en 'Formateur'.
    setNom(nom === 'Formateur' ? 'Laila' : 'Formateur');
  };

  // Rendu du composant :
  return (
    
    <div className="App">
      {/* Titre de l'application }*/
      /*<h1>Ma Première Application React!!</h1>

      {/* Utilisation du composant 'BoutonUtilisateur'} */
      /*<BoutonUtilisateur
        // Passe la valeur actuelle de 'nom' comme prop 'nom'
        nom={nom}
        // Passe la fonction 'handleNomChange' comme prop 'onClick'
        onClick={handleNomChange}
      />

      {/* Utilisation du composant 'CompteurUtilisateur' }*/
      /*<CompteurUtilisateur />
    </div>
    
  );
}//*/

function Apptest() {
 return (
    <AuthProvider>
      <CartProvider>
        <div className="app ">
          <header>
            <h1 className='text-2xl text-purple-500 font-bold'>La Boutique de LoriLove</h1>
            <AuthButton />
          </header>
          <ProductList />
        </div>
      </CartProvider>
    </AuthProvider>
    
  );
}

// Exporte le composant pour pouvoir l'utiliser dans d'autres fichiers.
export default Apptest;