import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

// Custom hook to use the auth context
export function useAuth() {
  return useContext(AuthContext);
}
