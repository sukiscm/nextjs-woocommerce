import { useQuery } from '@apollo/client';
import { GET_CUSTOMER_ORDERS } from '../../utils/gql/GQL_QUERIES';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.component';
import { logout } from '@/utils/auth';

interface Order {
  id: string;
  orderNumber: number;
  status: string;
  total: string;
  date: string;
}

/**
 * Customer account component that displays user's orders
 * @function CustomerAccount
 * @returns {JSX.Element} - Rendered component with order history
 */
const CustomerAccount = () => {
  const { loading, error, data } = useQuery(GET_CUSTOMER_ORDERS);
  const handleLogout = async () => {
    // Clear local storage
    localStorage.removeItem('woo-session');
    localStorage.removeItem('woocommerce-cart');
    
    // Redirect to home - this will clear cookies on the server
   await logout()
    window.location.href = '/';
  };
  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error: {error.message}</p>;

  const orders = data?.customer?.orders?.nodes;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Mine ordre</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Cerrar Sesión
        </button>
      {orders && orders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Ordrenummer</th>
                <th className="py-2 px-4 border-b">Dato</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: Order) => (
                <tr key={order.id}>
                  <td className="py-2 px-4 border-b">{order.orderNumber}</td>
                  <td className="py-2 px-4 border-b">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b">{order.status}</td>
                  <td className="py-2 px-4 border-b">{order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Du har ingen ordre.</p>
      )}
    </div>
  );
};

export default CustomerAccount;
