import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '@/App';

interface AuthRouteProps {
  children: React.ReactNode;
  requiredStatus?: 'authenticated' | 'unauthenticated';
}

export default function AuthRoute({ children, requiredStatus = 'authenticated' }: AuthRouteProps) {
  const { status } = useContext(AuthContext);

  if (status !== requiredStatus) {
    return <Navigate to={requiredStatus === 'authenticated' ? '/campus-auth' : '/'} replace />;
  }

  return <>{children}</>;
}