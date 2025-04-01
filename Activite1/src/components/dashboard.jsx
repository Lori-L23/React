import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  // Hook pour la navigation programmatique avec React Router v6
  const navigate = useNavigate();

  // État local pour stocker les données de l'utilisateur
  const [userData, setUserData] = useState(null);

  // État local pour stocker l'âge calculé de l'utilisateur
  const [age, setAge] = useState(0);

  // useEffect pour récupérer les données utilisateur depuis localStorage et calculer l'âge
  useEffect(() => {
    // Récupère les données utilisateur depuis localStorage
    const data = localStorage.getItem('userData');

    // Si les données n'existent pas, redirige l'utilisateur vers la page d'accueil
    if (!data) {
      navigate('/');
      return; // Sort de la fonction useEffect pour éviter les erreurs
    }

    // Parse les données JSON récupérées depuis localStorage
    const parsedData = JSON.parse(data);

    // Met à jour l'état userData avec les données parsées
    setUserData(parsedData);

    // Calcul de l'âge si la date de naissance est disponible
    if (parsedData.dateNaissance) {
      // Crée un objet Date à partir de la date de naissance
      const birthDate = new Date(parsedData.dateNaissance);

      // Obtient la date actuelle
      const today = new Date();

      // Calcule l'âge en années
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();

      // Ajuste l'âge si l'anniversaire n'est pas encore passé cette année
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }

      // Met à jour l'état age avec l'âge calculé
      setAge(calculatedAge);
    }
  }, [navigate]); // Dépendance de useEffect : la fonction est ré-exécutée si 'navigate' change.

  // Fonction pour gérer la déconnexion de l'utilisateur
  const handleLogout = () => {
    // Supprime les données utilisateur de localStorage
    localStorage.removeItem('userData');

    // Redirige l'utilisateur vers la page d'accueil
    navigate('/');
  };

  // Si userData est null, affiche un message de chargement
  if (!userData) {
    return <div className="flex items-center justify-center min-h-screen">Chargement...</div>;
  }

  // Rendu du composant
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-purple-700">
          Bienvenue, {userData.prenom} {userData.nom}!
        </h1>
        <p className="text-center text-gray-600">Vous avez {age} ans.</p>
        <p className="text-center text-gray-600">Votre email est : {userData.email}</p>
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Déconnexion
        </button>
      </div>
      {/* Inclusion de tailwind css cdn. */}
      <script src="https://cdn.tailwindcss.com"></script>
    </div>
  );
};

export default Dashboard;