import { Redirect } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuth();

  console.log('AuthGuard - isLoading:', isLoading, 'isAuthenticated:', isAuthenticated);

  if (isLoading) {
    return null; // You could add a loading screen here
  }

  if (!isAuthenticated) {
    console.log('AuthGuard - Redirecting to welcome screen');
    return <Redirect href="/auth/welcome" />;
  }

  console.log('AuthGuard - Rendering children');
  return <>{children}</>;
}
