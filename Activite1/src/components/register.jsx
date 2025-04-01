import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  // Hook pour la navigation programmatique avec React Router v6
  const navigate = useNavigate();

  // État local pour stocker les données du formulaire d'inscription
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    dateNaissance: '',
    email: '',
    password: '',
    confirmPassword: ''
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
      case 'nom':
      case 'prenom':
        // Vérifie si le champ est vide et si la longueur est inférieure à 3
        if (!value.trim()) error = 'Ce champ est obligatoire';
        if (value.length < 3) error = 'mimimum 3 caractères';
        break;
      case 'email':
        // Vérifie si l'email est valide avec une expression régulière
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Email invalide';
        break;
      case 'password':
        // Vérifie si le mot de passe a au moins 6 caractères
        if (value.length < 6) error = 'Le mot de passe doit contenir au moins 6 caractères';
        break;
      case 'confirmPassword':
        // Vérifie si les mots de passe correspondent
        if (value !== formData.password) error = 'Les mots de passe ne correspondent pas';
        break;
      case 'dateNaissance':
        // Vérifie si la date est entrée et si elle n'est pas dans le futur
        if (!value) error = 'Veuillez entrer votre date de naissance';
        else if (new Date(value) > new Date()) error = 'Date invalide';
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
      // Enregistrer les données (normalement dans une base de données via une API)
      // Pour cet exemple, nous stockons simplement dans localStorage
      const userData = {
        nom: formData.nom,
        prenom: formData.prenom,
        dateNaissance: formData.dateNaissance,
        email: formData.email
      };

      // Stocke les données utilisateur dans localStorage
      localStorage.setItem('userData', JSON.stringify(userData));

      // Redirige l'utilisateur vers le tableau de bord
      navigate('/Dashboard');
    }
  };

  return (
    <div className="flex items-center ml-100 w-96 justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-purple-600">Inscription</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">Prénom:</label>
              <input
                type="text"
                id="prenom"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                className={`w-full px-3 py-2 mt-1 border rounded-md ${errors.prenom ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.prenom && <p className="mt-1 text-sm text-red-600">{errors.prenom}</p>}
            </div>
            
            <div>
              <label htmlFor="nom" className="block text-sm font-medium text-gray-700">Nom:</label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                className={`w-full px-3 py-2 mt-1 border rounded-md ${errors.nom ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.nom && <p className="mt-1 text-sm text-red-600">{errors.nom}</p>}
            </div>
          </div>
          
          <div>
            <label htmlFor="dateNaissance" className="block text-sm font-medium text-gray-700">Date de Naissance:</label>
            <input
              type="date"
              id="dateNaissance"
              name="dateNaissance"
              value={formData.dateNaissance}
              onChange={handleChange}
              className={`w-full px-3 py-2 mt-1 border rounded-md ${errors.dateNaissance ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.dateNaissance && <p className="mt-1 text-sm text-red-600">{errors.dateNaissance}</p>}
          </div>
          
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
          
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirmer le mot de passe:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-3 py-2 mt-1 border rounded-md ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
          </div>
          
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              S'inscrire
            </button>
          </div>
        </form>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Déjà un compte?{' '}
            <Link to="/" className="font-medium text-blue-600 hover:text-blue-500">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
        <script src="https://cdn.tailwindcss.com"></script>
    </div>
  );
};

export default Register;