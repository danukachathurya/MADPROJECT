import { createContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '../services/authService';
import { setAuthToken } from '../services/api';

export const AuthContext = createContext(null);
const TOKEN_KEY = '@campus_profile_token';
const USER_KEY = '@campus_profile_user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function restoreSession() {
      try {
        const token = await AsyncStorage.getItem(TOKEN_KEY);
        if (!token) return;
        setAuthToken(token);
        const response = await authService.me();
        setUser(response.data);
      } catch (error) {
        setAuthToken(null);
        await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
      } finally { setLoading(false); }
    }
    restoreSession();
  }, []);

  const value = useMemo(() => ({
    user, loading, isAuthenticated: Boolean(user),
    async login(credentials) {
      const response = await authService.login(credentials);
      setAuthToken(response.token);
      await AsyncStorage.multiSet([[TOKEN_KEY, response.token], [USER_KEY, JSON.stringify(response.user)]]);
      setUser(response.user);
      return response;
    },
    async logout() {
      setAuthToken(null);
      await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
      setUser(null);
    }
  }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

