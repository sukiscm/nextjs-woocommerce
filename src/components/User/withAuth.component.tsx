// src/components/User/withAuth.component.tsx
import { useRouter } from 'next/router';
import { useEffect, ComponentType, useState } from 'react';
import { hasCredentials } from '../../utils/auth';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.component';

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const Wrapper = (props: P) => {
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const checkAuth = async () => {
        const hasAuth = hasCredentials();
        
        if (!hasAuth) {
          router.push('/iniciar-sesion');
        } else {
          setIsAuthenticated(true);
        }
        
        setIsChecking(false);
      };

      checkAuth();
    }, [router]);

    if (isChecking) {
      return (
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <LoadingSpinner />
            <p className="mt-4 text-accent-6">Verificando sesión...</p>
          </div>
        </div>
      );
    }

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;