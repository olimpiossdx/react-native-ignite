import React, { createContext, ReactNode } from 'react';
import { useContext } from 'hoist-non-react-statics/node_modules/@types/react';

interface AuthProviderProps {
  children: ReactNode;
};

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
};

interface AuthContextData {
  user: User;
};

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const user = {
    id: '122',
    name: 'jujé',
    email: 'juje@teste.com'
  };

  return (<AuthContext.Provider value={{ user }}>
    {children}
  </AuthContext.Provider>);
};

function useAuth() {
  const context = useContext(AuthContext);
  return context;
};

export { AuthProvider, useAuth };
