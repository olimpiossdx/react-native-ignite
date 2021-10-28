import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AuthRoutes } from './auth.routes';
import { AppRoutes } from './app.route';
import { useAuth } from '../hooks/auth';

export function Routes() {
  const { user } = useAuth();

  return (<NavigationContainer>
    {Object.keys(user).length === 0 ? <AuthRoutes /> : <AppRoutes />}
  </NavigationContainer>);
};