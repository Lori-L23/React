import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

const Clock = () => {

    // État local pour stocker l heure actuelle
    const [Time, setTime] = useState(new Date());

    // useEffect pour mettre à jour l'heure actuelle toutes les secondes
  useEffect (() => {
    //creer un intervalle pour mettre à jour l'heure chaque seconde
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    //Fonction de nettoyage pour arrêter l'intervalle lorsque le composant est démonté
    return () => clearInterval(interval); // Nettoie l intervalle quand le composant est démonté

  }, []); // Le tableau vide [] signifie que l'effet ne s'exécute qu'une seule fois après le premier rendu

  //Formatage de l 'heure au format 24 heures
  const formattedTime = Time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
//   const formattedTime = Time.toLocaleTimeString();

return (
    <div className="clock-container">
      <h1 className='text-purple-500 text-1xl font-bold p-6 mt-6'>Heure actuelle :</h1>
      <p className='time-display mt-6'>{formattedTime}</p>
    </div>
  );


}

export default Clock;


