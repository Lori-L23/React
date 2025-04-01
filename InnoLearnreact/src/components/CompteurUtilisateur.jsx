import React, { useState, useEffect } from 'react';

function CompteurUtilisateur() {
  // Déclare une variable d'état appelée 'compteur' et une fonction 'setCompteur'
  // pour mettre à jour cette variable. La valeur initiale de 'compteur' est 0.
  const [compteur, setCompteur] = useState(0);

  // useEffect est un hook qui permet d'effectuer des effets de bord dans les composants fonctionnels.
  // Dans ce cas, il est utilisé pour mettre à jour le titre du document en fonction de la valeur de 'compteur'.
  
  useEffect(() => {
    // Met à jour le titre du document avec la valeur actuelle de 'compteur'.
    document.title = `Compteur : ${compteur}`;

    // Le tableau [compteur] spécifie que cet effet doit être exécuté uniquement lorsque la valeur de 'compteur' change.
  }, [compteur]);

  // Le composant renvoie le rendu suivant :
  return (
    <div>
      {/* Affiche le nombre de clics */}
      <p>Vous avez cliqué {compteur} fois</p>

      {/* Bouton qui incrémente le compteur lorsqu'il est cliqué */}
      <button onClick={() => setCompteur(compteur + 1)}>
        Cliquez ici
      </button>
    </div>
  );
}

// Exporte le composant pour pouvoir l'utiliser dans d'autres fichiers.
export default CompteurUtilisateur;