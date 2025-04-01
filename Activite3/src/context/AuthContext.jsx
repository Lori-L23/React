import { createContext, useState, useContext } from 'react';

// Création du contexte d'authentification
// Ce contexte gérera l'état de l'utilisateur connecté
const AuthContext = createContext();

// Composant Provider exporté directement
// Il encapsule l'application et fournit l'état d'authentification
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook personnalisé exporté directement
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}