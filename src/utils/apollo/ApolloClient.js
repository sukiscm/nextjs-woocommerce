// src/utils/apollo/ApolloClient.js
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
} from '@apollo/client';

const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

export const middleware = new ApolloLink(async (operation, forward) => {
  const headers = {};

  // WooCommerce Session
  if (process.browser) {
    const sessionData = JSON.parse(localStorage.getItem('woo-session') || 'null');
    
    if (sessionData?.token && sessionData?.createdTime) {
      const { token, createdTime } = sessionData;

      if (Date.now() - createdTime > SEVEN_DAYS) {
        localStorage.removeItem('woo-session');
        localStorage.setItem('woocommerce-cart', JSON.stringify({}));
      } else {
        headers['woocommerce-session'] = `Session ${token}`;
      }
    }

    // Auth Token
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }

    // WooCommerce Session Token
    const wooSessionToken = localStorage.getItem('wooSessionToken');
    if (wooSessionToken) {
      headers['woocommerce-session'] = `Session ${wooSessionToken}`;
    }
  }

  operation.setContext({ headers });
  return forward(operation);
});

export const afterware = new ApolloLink((operation, forward) =>
  forward(operation).map((response) => {
    const context = operation.getContext();
    const { response: { headers } } = context;

    const session = headers.get('woocommerce-session');

    if (session && process.browser) {
      if ('false' === session) {
        localStorage.removeItem('woo-session');
      } else if (!localStorage.getItem('woo-session')) {
        localStorage.setItem(
          'woo-session',
          JSON.stringify({ token: session, createdTime: Date.now() }),
        );
      }
    }

    return response;
  }),
);

const clientSide = typeof window === 'undefined';

const client = new ApolloClient({
  ssrMode: clientSide,
  link: middleware.concat(
    afterware.concat(
      createHttpLink({
        uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
        fetch,
        credentials: 'include',
      }),
    ),
  ),
  cache: new InMemoryCache(),
});

export default client;