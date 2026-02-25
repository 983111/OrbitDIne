import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getAuthToken, getAuthUser } from '@/lib/sessionAuth';

type Props = {
  roles?: Array<'manager' | 'owner'>;
  children: ReactNode;
};

export default function ProtectedRoute({ roles, children }: Props) {
  const token = getAuthToken();
  const user = getAuthUser();
  const location = useLocation();

  if (!token || !user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
