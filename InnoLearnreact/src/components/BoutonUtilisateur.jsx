//Cette ligne importe la bibliothèque React, 
// qui est nécessaire pour définir des composants React

import React from 'react';

//Pascalcasing est utilisé pour les noms de fichiers de composants React.
//Cela signifie que le nom du fichier commence par une majuscule,
//et chaque mot dans le nom du fichier commence également par une majuscule.

function BoutonUtilisateur({ nom, onClick }) { // le BoutonUtilisateur est un composant fonctionnel React. 
  return (
    <button 
      onClick={onClick} // cette ligne attache la fonction onClick passée en prop à l'événement click du bouton.
    
    >
      Bonjour, {nom}  
      </button>//cette ligne affiche le texte "Bonjour," suivi du nom de l'utilisateur, qui est inséré dynamiquement à partir de la prop nom.
  
  );
}

export default BoutonUtilisateur;//Cette ligne rend le composant BoutonUtilisateur disponible pour être importé et utilisé dans d'autres fichiers.