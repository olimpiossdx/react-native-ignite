import React, { createContext, ReactNode, useContext, useState } from "react";
import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from "@react-native-async-storage/async-storage";

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

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
  signInWithGoogle(): Promise<void>;
  signInWithApple(): Promise<void>;
};

interface AuthorizationResponse {
  authentication?: string;
  errorCode?: string;
  params: {
    access_token: string;
    authuser: string;
    exp: string;
    expires_in: string;
    prompt: string;
    scope: string;
    token_type: string;
  },
  type: string,
  url: string;
};

interface UserInfoGoogle {
  email: string;
  family_name: string;
  given_name: string;
  id: string;
  locale: string;
  name: string;
  picture: string;
  verified_email: boolean;
};

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState({} as User);

  async function signInWithGoogle() {
    try {
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse;

      if (type === 'success') {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
        const { id, email, given_name, picture } = await response.json() as UserInfoGoogle;

        const userLogged = {
          id, email,
          name: given_name,
          photo: picture
        };

        setUser(userLogged);
        await AsyncStorage.setItem('@gofinances:user', JSON.stringify(userLogged));
      };

    } catch (error: any) {
      throw new Error(error);
    }
  };

  async function signInWithApple() {
    try {
      const credentecial = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL
        ]
      });

      if (credentecial) {
        const { user, email, fullName, } = credentecial;

        const userLogged = {
          id: user,
          email: email!,
          name: fullName?.givenName!,
          photo: undefined
        };

        setUser(userLogged);
        await AsyncStorage.setItem('@gofinances:user', JSON.stringify(userLogged));
      }

    } catch (error: any) {
      throw new Error(error);
    }
  }

  return (<AuthContext.Provider value={{ user, signInWithGoogle, signInWithApple }}>
    {children}
  </AuthContext.Provider>);
};

function useAuth() {
  const context = useContext(AuthContext);
  return context;
};

export { AuthProvider, useAuth };
