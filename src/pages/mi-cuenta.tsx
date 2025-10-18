// src/pages/mi-cuenta.tsx
import Layout from '@/components/Layout/Layout.component';
import CustomerAccount from '@/components/User/CustomerAccount.component';
import withAuth from '@/components/User/withAuth.component';
import { getUserInfo, logout } from '@/utils/auth';
import { User, Package, LogOut, Settings } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { NextPage } from 'next';

const CustomerAccountPage: NextPage = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userInfo = getUserInfo();
    setUser(userInfo);
  }, []);

  const handleLogout = async () => {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      await logout();
    }
  };

  return (
    <Layout title="Mi Cuenta">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="bg-white rounded-lg border border-accent-2 p-8 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-violet to-pink rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {user?.firstName?.charAt(0) || user?.name?.charAt(0) || 'U'}
              </div>
              <div>
                <h1 className="text-2xl font-light mb-1">
                  Hola, {user?.firstName || user?.name || 'Usuario'}
                </h1>
                <p className="text-accent-6">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm text-accent-7 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Cerrar Sesión
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Mis Pedidos */}
          <div className="bg-white rounded-lg border border-accent-2 p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-violet/10 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-violet" />
              </div>
              <h2 className="text-lg font-medium">Mis Pedidos</h2>
            </div>
            <p className="text-sm text-accent-6">
              Ver historial de compras y rastrear pedidos
            </p>
          </div>

          {/* Información Personal */}
          <div className="bg-white rounded-lg border border-accent-2 p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-pink/10 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-pink" />
              </div>
              <h2 className="text-lg font-medium">Información Personal</h2>
            </div>
            <p className="text-sm text-accent-6">
              Actualizar datos de contacto y dirección
            </p>
          </div>

          {/* Configuración */}
          <div className="bg-white rounded-lg border border-accent-2 p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-cyan/10 rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-cyan" />
              </div>
              <h2 className="text-lg font-medium">Configuración</h2>
            </div>
            <p className="text-sm text-accent-6">
              Preferencias y configuración de cuenta
            </p>
          </div>
        </div>

        {/* Historial de Pedidos */}
        <CustomerAccount />
      </div>
    </Layout>
  );
};

export default withAuth(CustomerAccountPage);