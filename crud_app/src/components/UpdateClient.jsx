import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

/**
 * Composant pour la modification d'un client existant
 * Features:
 * - Récupère les données actuelles du client
 * - Formulaire de mise à jour avec validation
 * - Gestion des erreurs et loading states
 * - Style Tailwind CSS moderne
 */
const UpdateClient = () => {
    // Récupération de l'ID du client depuis l'URL
    const { id } = useParams();
    
    // État pour stocker les données du formulaire
    const [client, setClient] = useState({ 
        nom: '', 
        adresse: '', 
        tel: '' 
    });
    
    // États pour gérer le chargement et les erreurs
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    
    const navigate = useNavigate();

    /**
     * Récupère les données du client à modifier
     */
    useEffect(() => {
        const fetchClient = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:3001/clients/${id}`);
                setClient(response.data);
            } catch (err) {
                setError("Erreur lors du chargement du client");
                console.error("Erreur API:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchClient();
    }, [id]);

    /**
     * Gère la soumission du formulaire
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            await axios.put(`http://localhost:3001/clients/${id}`, client);
            navigate('/clients', { replace: true });
        } catch (err) {
            setError(err.response?.data?.message || "Erreur lors de la mise à jour");
            console.error("Erreur API:", err);
        } finally {
            setSubmitting(false);
        }
    };

    /**
     * Gère les changements dans les champs du formulaire
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setClient(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            {/* Carte principale */}
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                {/* En-tête */}
                <div className="bg-indigo-600 p-6">
                    <h1 className="text-2xl font-bold text-white text-center">
                        Mettre à jour le client
                    </h1>
                </div>

                {/* Contenu */}
                <div className="p-8">
                    {/* Affichage des erreurs */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
                            {error}
                        </div>
                    )}

                    {/* Indicateur de chargement */}
                    {loading ? (
                        <div className="flex justify-center py-12 ">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Champ Nom */}
                            <div>
                                <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
                                    Nom du client *
                                </label>
                                <input
                                    id="nom"
                                    name="nom"
                                    type="text"
                                    required
                                    value={client.nom}
                                    onChange={handleChange}
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
                                    Téléphone *
                                </label>
                                <input
                                    id="tel"
                                    name="tel"
                                    type="tel"
                                    required
                                    pattern="[0-9]{9}"
                                    title="9 chiffres requis"
                                    value={client.tel}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            {/* Boutons d'action */}
                            <div className="flex justify-between pt-4">
                                <button
                                    type="button"
                                    onClick={() => navigate('/clients')}
                                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {submitting ? 'Enregistrement...' : 'Mettre à jour'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UpdateClient;