import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

/**
 * Composant pour la création d'un nouveau client
 * Features:
 * - Formulaire de création avec validation
 * - Gestion des erreurs
 * - Redirection après succès
 * - Style avec Tailwind CSS
 */
const CreateClient = () => {
  // État pour le formulaire et la gestion des erreurs
  const [client, setClient] = useState({
    nom: "",
    adresse: "",
    tel: ""
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  /**
   * Soumission du formulaire
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await axios.post("http://localhost:3001/clients", client);
      navigate("/clients", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de la création");
      console.error("Erreur API:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Gestion des changements des champs
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="text-center mb-10 bg-indigo-600 p-6 rounded-2xl">
            <h1 className="text-2xl font-bold text-white">Créer un nouveau client</h1>
          </div>

          {/* Affichage des erreurs */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Champ Nom */}
            <div>
              <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
                Nom complet
              </label>
              <input
                id="nom"
                name="nom"
                type="text"
                value={client.nom}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Champ Adresse */}
            <div>
              <label htmlFor="adresse" className="block text-sm font-medium text-gray-700">
                Adresse
              </label>
              <input
                id="adresse"
                name="adresse"
                type="text"
                value={client.adresse}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Champ Téléphone */}
            <div>
              <label htmlFor="tel" className="block text-sm font-medium text-gray-700">
                Téléphone
              </label>
              <input
                id="tel"
                name="tel"
                type="tel"
                value={client.tel}
                onChange={handleChange}
                pattern="[0-9]{9}"
                title="9 chiffres requis"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Boutons d'action */}
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate("/clients")}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Création en cours...' : 'Créer le client'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateClient;