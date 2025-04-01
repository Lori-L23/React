import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

/**
 * Composant d'affichage et de gestion de la liste des clients
 * Features:
 * - Affichage tabulaire des clients
 * - Pagination simple
 * - Fonctions de suppression
 * - Redirection vers création/édition
 * - Style complet Tailwind CSS
 */
const ClientList = () => {
    // États du composant
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const clientsPerPage = 5;
    const navigate = useNavigate();

    /**
     * Récupère les clients depuis l'API
     */
    const fetchClients = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:3001/clients');
            setClients(response.data);
        } catch (err) {
            setError(err.message);
            console.error("Erreur API:", err);
        } finally {
            setLoading(false);
        }
    };

    // Effet de chargement initial
    useEffect(() => {
        fetchClients();
    }, []);

    /**
     * Supprime un client
     * @param {number} id - ID du client à supprimer
     */
    const handleDelete = async (id) => {
        if (window.confirm("Confirmer la suppression de ce client ?")) {
            try {
                await axios.delete(`http://localhost:3001/clients/${id}`);
                fetchClients(); // Rafraîchit la liste
            } catch (err) {
                setError("Échec de la suppression");
            }
        }
    };

    // Calcul de la pagination
    const indexOfLastClient = currentPage * clientsPerPage;
    const indexOfFirstClient = indexOfLastClient - clientsPerPage;
    const currentClients = clients.slice(indexOfFirstClient, indexOfLastClient);
    const totalPages = Math.ceil(clients.length / clientsPerPage);

    return (
        <div className="container mx-auto px-4 py-8">
            {/* En-tête */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Gestion des clients</h1>
                <Link 
                    to="/clients/create"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition duration-200"
                >
                    + Nouveau client
                </Link>
            </div>

            {/* Messages d'erreur */}
            {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
                    <p>{error}</p>
                </div>
            )}

            {/* Tableau des clients */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Chargement des clients...</p>
                    </div>
                ) : (
                    <>
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Nom
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Adresse
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Téléphone
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentClients.length > 0 ? (
                                    currentClients.map(client => (
                                        <tr key={client.id} className="hover:bg-gray-50">
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-nowrap">
                                                    {client.nom}
                                                </p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-600 whitespace-nowrap">
                                                    {client.adresse}
                                                </p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-600 whitespace-nowrap">
                                                    {client.tel}
                                                </p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => navigate(`/clients/${client.id}/update`)}
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                    >
                                                        Éditer
                                                    </button>
                                                    <button
                                                        onClick={() => navigate(`/clients/${client.id}/Details`)}
                                                        className="text-green-600 hover:text-green-900"
                                                    >
                                                        Details
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(client.id)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        Supprimer
                                                    </button>

                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                            Aucun client trouvé
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="px-5 py-3 bg-white border-t flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-700">
                                        Page <span className="font-medium">{currentPage}</span> sur <span className="font-medium">{totalPages}</span>
                                    </p>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                        className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'}`}
                                    >
                                        Précédent
                                    </button>
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                        className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'}`}
                                    >
                                        Suivant
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ClientList;