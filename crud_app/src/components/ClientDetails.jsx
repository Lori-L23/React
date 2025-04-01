// Composant pour les details des clients 

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

/**
 * Composant pour afficher les détails d'un client spécifique
 * Features:
 * - Récupère les détails du client depuis l'API
 * - Affiche les informations de manière structurée
 * - Gère les états de chargement et erreurs
 * - Style Tailwind CSS moderne
 */
const ClientDetails = () => {
    // Récupère l'ID du client depuis les paramètres d'URL
    const { id } = useParams();
    
    // État pour stocker les données du client
    const [client, setClient] = useState({});
    
    // États pour gérer le chargement et les erreurs
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Hook pour la navigation
    const navigate = useNavigate();

    /**
     * Récupère les détails du client depuis l'API
     */
    useEffect(() => {
        const fetchClient = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:3001/clients/${id}`);
                setClient(response.data);
            } catch (err) {
                setError("Erreur lors du chargement des détails du client");
                console.error("Erreur API:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchClient();
    }, [id]); // Dépendance à l'ID pour recharger si changement

    return (
        <div className="min-h-screen  py-8 px-4 sm:px-6 lg:px-8">
            {/* Carte principale */}
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                {/* En-tête de la carte */}
                <div className="bg-indigo-600 p-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-white">Détails du client</h1>
                        
                    </div>
                </div>

                {/* Contenu */}
                <div className="p-8">
                    {/* Affichage des erreurs */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
                            <p>{error}</p>
                        </div>
                    )}

                    {/* Indicateur de chargement */}
                    {loading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {/* Section Informations */}
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">Informations du client</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Bloc Nom */}
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="text-sm font-medium text-gray-500">Nom complet</h3>
                                        <p className="mt-1 text-lg font-medium text-gray-900">
                                            {client.nom || 'Non renseigné'}
                                        </p>
                                    </div>

                                    {/* Bloc Téléphone */}
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="text-sm font-medium text-gray-500">Téléphone</h3>
                                        <p className="mt-1 text-lg font-medium text-gray-900">
                                            {client.tel || 'Non renseigné'}
                                        </p>
                                    </div>

                                    {/* Bloc Adresse (pleine largeur) */}
                                    <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
                                        <h3 className="text-sm font-medium text-gray-500">Adresse</h3>
                                        <p className="mt-1 text-lg font-medium text-gray-900">
                                            {client.adresse || 'Non renseigné'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Boutons d'action */}
                            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                                <button
                                    onClick={() => navigate(`/clients/${id}/update`)}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200"
                                >
                                    Modifier ce client
                                </button>
                                <button
                                    onClick={() => navigate(-1)}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition duration-200"
                                >
                                    Retour
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClientDetails;