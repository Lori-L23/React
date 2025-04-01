import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  // Hook pour la navigation programmatique avec React Router v6
  const navigate = useNavigate();

  // État local pour stocker les données du formulaire (email et mot de passe)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // État local pour stocker les erreurs de validation du formulaire
  const [errors, setErrors] = useState({});

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    // Récupère le nom et la valeur du champ modifié
    const { name, value } = e.target;

    // Met à jour l'état formData avec la nouvelle valeur
    setFormData({
      ...formData,
      [name]: value
    });

    // Valide le champ modifié
    validateField(name, value);
  };

  // Fonction pour valider un champ individuel
  const validateField = (name, value) => {
    // Variable pour stocker le message d'erreur
    let error = '';

    // Validation spécifique pour chaque champ
    switch (name) {
      case 'email':
        // Vérifie si l'email est valide avec une expression régulière
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Email invalide';
        break;
      case 'password':
        // Vérifie si le mot de passe a au moins 6 caractères
        if (value.length < 6) error = 'Le mot de passe doit contenir au moins 6 caractères';
        break;
      default:
        break;
    }

    // Met à jour l'état errors avec le message d'erreur (ou une chaîne vide si aucune erreur)
    setErrors({ ...errors, [name]: error });
  };

  // Fonction pour valider l'ensemble du formulaire
  const validateForm = () => {
    // Nouvel objet pour stocker les erreurs de validation
    const newErrors = {};

    // Parcours tous les champs du formulaire
    Object.keys(formData).forEach(key => {
      // Valide chaque champ
      validateField(key, formData[key]);

      // Vérifie si le champ est vide et ajoute une erreur si c'est le cas
      if (!formData[key].trim()) newErrors[key] = 'Ce champ est obligatoire';
    });

    // Met à jour l'état errors avec les nouvelles erreurs
    setErrors(newErrors);

    // Retourne true si aucune erreur n'a été trouvée, false sinon
    return Object.keys(newErrors).length === 0;
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = (e) => {
    // Empêche le comportement par défaut de la soumission du formulaire
    e.preventDefault();

    // Valide le formulaire
    if (validateForm()) {

      // Stocke les données utilisateur dans localStorage (à remplacer par une authentification backend)
      localStorage.setItem('userData', JSON.stringify(userData));

      // Redirige l'utilisateur vers le tableau de bord
      navigate('/Dashboard');
    }
  };

  // Rendu du composant
  return (
    <div className="flex items-center ml-100 justify-center w-96 min-h-screen">
      <div className="w-full p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-purple-600">Connexion</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Champ Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 mt-1 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          {/* Champ Mot de passe */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-3 py-2 mt-1 border rounded-md ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
          </div>

          {/* Bouton de connexion */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Se connecter
            </button>
          </div>
        </form>

        {/* Lien vers la page d'inscription */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Pas encore de compte?{' '}
            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
              S'inscrire
            </Link>
          </p>
        </div>
      </div>

    </div>
  );
};

export default Login;