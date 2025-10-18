// src/utils/auth.ts
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { LOGIN_USER, LOGOUT_USER } from './gql/GQL_MUTATIONS';
import { GET_CURRENT_USER } from './gql/GQL_QUERIES';

/**
 * Verifica si hay credenciales guardadas
 */
export function hasCredentials(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  
  const authToken = localStorage.getItem('authToken');
  return !!authToken;
}

/**
 * Obtiene el token de autenticación
 */
export function getAuthToken(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  return localStorage.getItem('authToken');
}

/**
 * Mensajes de error en español de México
 */
function getErrorMessage(error: any): string {
  console.error('Error completo:', error);
  
  if (error.graphQLErrors && error.graphQLErrors.length > 0) {
    const message = error.graphQLErrors[0].message;
    
    if (message.toLowerCase().includes('invalid_username') || 
        message.toLowerCase().includes('usuario inválido')) {
      return 'Usuario o correo electrónico inválido.';
    }
    if (message.toLowerCase().includes('incorrect_password') || 
        message.toLowerCase().includes('contraseña incorrecta')) {
      return 'Contraseña incorrecta. Por favor verifica tus datos.';
    }
    if (message.toLowerCase().includes('invalid_email')) {
      return 'Correo electrónico inválido.';
    }
    if (message.toLowerCase().includes('empty_username')) {
      return 'Por favor ingresa tu usuario o correo electrónico.';
    }
    if (message.toLowerCase().includes('empty_password')) {
      return 'Por favor ingresa tu contraseña.';
    }
    if (message.toLowerCase().includes('too_many')) {
      return 'Demasiados intentos fallidos. Espera un momento.';
    }
    
    return message || 'Error al iniciar sesión. Verifica tus datos.';
  }
  
  if (error.networkError) {
    return 'Error de conexión. Verifica tu conexión a internet.';
  }
  
  return error.message || 'Ocurrió un error desconocido.';
}

/**
 * Inicia sesión
 */
export async function login(username: string, password: string) {
  try {
    const client = new ApolloClient({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
      cache: new InMemoryCache(),
      credentials: 'include',
    });

    console.log('🔐 Iniciando sesión...', { username });

    const { data } = await client.mutate({
      mutation: LOGIN_USER,
      variables: { username, password },
    });

    console.log('✅ Login exitoso:', data);

    const loginResult = data?.login;

    if (!loginResult || !loginResult.authToken) {
      throw new Error('No se recibió token de autenticación');
    }

    // Guardar todos los tokens
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', loginResult.authToken);
      localStorage.setItem('refreshToken', loginResult.refreshToken);
      localStorage.setItem('sessionToken', loginResult.sessionToken);
      localStorage.setItem('wooSessionToken', loginResult.wooSessionToken);
      localStorage.setItem('user', JSON.stringify(loginResult.user));
      
      console.log('✅ Tokens guardados correctamente');
    }

    return { 
      success: true, 
      status: 'SUCCESS',
      user: loginResult.user,
      authToken: loginResult.authToken 
    };
  } catch (error: unknown) {
    console.error('❌ Error de login:', error);
    const message = getErrorMessage(error);
    throw new Error(message);
  }
}

/**
 * Cierra sesión
 */
export async function logout() {
  try {
    const client = new ApolloClient({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
      cache: new InMemoryCache(),
      credentials: 'include',
    });

    await client.mutate({
      mutation: LOGOUT_USER,
    });

    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('sessionToken');
      localStorage.removeItem('wooSessionToken');
      localStorage.removeItem('user');
      localStorage.removeItem('woo-session');
      localStorage.removeItem('woocommerce-cart');
      
      window.location.href = '/';
    }
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    
    if (typeof window !== 'undefined') {
      localStorage.clear();
      window.location.href = '/';
    }
  }
}

/**
 * Obtiene el usuario actual
 */
export async function getCurrentUser() {
  try {
    const client = new ApolloClient({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
      cache: new InMemoryCache(),
      credentials: 'include',
    });

    const { data } = await client.query({
      query: GET_CURRENT_USER,
      fetchPolicy: 'network-only',
    });

    return data?.customer || null;
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    return null;
  }
}

/**
 * Obtiene información del usuario guardado
 */
export function getUserInfo() {
  if (typeof window === 'undefined') {
    return null;
  }
  
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
}