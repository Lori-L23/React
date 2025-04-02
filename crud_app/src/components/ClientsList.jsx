import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ClientList = () => {
    const [clients, setClients] = useState([]);
    const [filteredClients, setFilteredClients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const clientsPerPage = 5;
    const navigate = useNavigate();

    const fetchClients = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:3001/clients');
            setClients(response.data);
            setFilteredClients(response.data);
        } catch (err) {
            setError(err.message);
            console.error("Erreur API:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const filtered = clients.filter(client => 
            client.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.adresse?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.tel?.includes(searchTerm)
        );
        setFilteredClients(filtered);
        setCurrentPage(1); // Réinitialise la pagination lors d'une nouvelle recherche
    }, [searchTerm, clients]);

    useEffect(() => {
        fetchClients();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Confirmer la suppression de ce client ?")) {
            try {
                await axios.delete(`http://localhost:3001/clients/${id}`);
                fetchClients();
            } catch (err) {
                setError("Échec de la suppression");
            }
        }
    };

    // Calcul de la pagination sur les clients filtrés
    const indexOfLastClient = currentPage * clientsPerPage;
    const indexOfFirstClient = indexOfLastClient - clientsPerPage;
    const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient);
    const totalPages = Math.ceil(filteredClients.length / clientsPerPage);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <h1 className="text-2xl font-bold text-gray-800">Gestion des clients</h1>
                
                <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-grow">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Rechercher par nom, adresse ou téléphone..."
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    
                    <Link 
                        to="/clients/create"
                        className="bg-indigo-700 hover:bg-indigo-500 hover:text-white text-white px-4 py-2 rounded-md whitespace-nowrap text-center"
                    >
                        + Nouveau client
                    </Link>
                </div>
            </div>

            {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
                    {error}
                </div>
            )}

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
                                                        className="text-indigo-600 hover:bg-indigo-500 hover:text-white px-4 py-2 rounded-md"
                                                    >
                                                        Éditer
                                                    </button>
                                                    <button
                                                        onClick={() => navigate(`/clients/${client.id}/details`)}
                                                        className="text-green-600 hover:bg-green-500 hover:text-white px-4 py-2 rounded-md"
                                                    >
                                                        Détails
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(client.id)}
                                                        className="text-red-600 hover:bg-red-500 hover:text-white px-4 py-2 rounded-md"
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
                                            {searchTerm ? "Aucun résultat trouvé" : "Aucun client disponible"}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {filteredClients.length > clientsPerPage && (
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