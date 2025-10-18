// src/pages/iniciar-sesion.tsx
import Layout from '@/components/Layout/Layout.component';
import UserLogin from '@/components/User/UserLogin.component';
import Link from 'next/link';
import type { NextPage } from 'next';

const LoginPage: NextPage = () => {
  return (
    <Layout title="Iniciar Sesión">
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-violet to-pink rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              A
            </div>
            <h1 className="text-3xl font-light mb-2">Bienvenido de vuelta</h1>
            <p className="text-accent-6">
              Inicia sesión en tu cuenta para continuar
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-white border border-accent-2 rounded-lg p-8 shadow-sm">
            <UserLogin />
            
            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-accent-2"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-accent-5">¿No tienes cuenta?</span>
              </div>
            </div>

            {/* Register Link */}
            <div className="text-center">
              <Link 
                href="/registrarse" 
                className="text-primary hover:text-violet font-medium transition-colors"
              >
                Regístrate aquí
              </Link>
            </div>
          </div>

          {/* Footer Links */}
          <div className="mt-6 text-center space-y-2">
            <Link 
              href="/recuperar-contrasena" 
              className="block text-sm text-accent-6 hover:text-primary transition-colors"
            >
              ¿Olvidaste tu contraseña?
            </Link>
            <Link 
              href="/" 
              className="block text-sm text-accent-6 hover:text-primary transition-colors"
            >
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;