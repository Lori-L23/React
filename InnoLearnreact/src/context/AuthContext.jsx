import { createContext, useState, useContext } from 'react';

// 1. Création du contexte
const AuthContext = createContext();

// 2. Provider qui englobera l'application
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Fonction de connexion
  const login = (userData) => {
    setUser(userData);
  };

  // Fonction de déconnexion
  const logout = () => {
    setUser(null);
  };

  // Valeur exposée par le contexte
  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user, // Booléen pour vérifier si connecté
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 3. Hook personnalisé pour utiliser le contexte
export function useAuth() {
  return useContext(AuthContext);
}