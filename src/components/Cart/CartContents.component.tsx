// src/components/Cart/CartContents.component.tsx
import { useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

import { useCartStore } from '@/stores/cartStore';
import Button from '@/components/UI/Button.component';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.component';

import {
  getFormattedCart,
  getUpdatedItems,
  IProductRootObject,
} from '@/utils/functions/functions';

import { GET_CART } from '@/utils/gql/GQL_QUERIES';
import { UPDATE_CART } from '@/utils/gql/GQL_MUTATIONS';

const CartContents = () => {
  const router = useRouter();
  const { clearWooCommerceSession, syncWithWooCommerce } = useCartStore();
  const isCheckoutPage = router.pathname === '/kasse';

  const { data, refetch } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      const updatedCart = getFormattedCart(data);
      if (!updatedCart && !data?.cart?.contents?.nodes?.length) {
        clearWooCommerceSession();
        return;
      }
      if (updatedCart) {
        syncWithWooCommerce(updatedCart);
      }
    },
  });

  const [updateCart, { loading: updateCartProcessing }] = useMutation(
    UPDATE_CART,
    {
      onCompleted: () => {
        refetch();
      },
    },
  );

  const handleQuantityUpdate = (
    cartKey: string,
    currentQty: number,
    delta: number,
    products: IProductRootObject[],
  ) => {
    const newQty = Math.max(1, currentQty + delta);
    if (products?.length) {
      const updatedItems = getUpdatedItems(products, newQty, cartKey);
      updateCart({
        variables: {
          input: {
            clientMutationId: uuidv4(),
            items: updatedItems,
          },
        },
      });
    }
  };

  const handleRemoveProduct = (
    cartKey: string,
    products: IProductRootObject[],
  ) => {
    if (products?.length) {
      const updatedItems = getUpdatedItems(products, 0, cartKey);
      updateCart({
        variables: {
          input: {
            clientMutationId: uuidv4(),
            items: updatedItems,
          },
        },
      });
    }
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  const cartTotal = data?.cart?.total || '$0';
  const cartItems = data?.cart?.contents?.nodes || [];

  if (!cartItems.length) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-accent-3 mx-auto mb-4" />
          <h2 className="text-2xl font-light mb-2 text-accent-9">
            Tu carrito está vacío
          </h2>
          <p className="text-accent-6 mb-6">
            Agrega productos para continuar
          </p>
          <Link href="/productos">
            <Button variant="primary">Explorar productos</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items - 2/3 width */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-light mb-8">Carrito de Compras</h1>
          
          <div className="space-y-4">
            {cartItems.map((item: IProductRootObject) => (
              <div
                key={item.key}
                className="bg-white border border-accent-2 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex gap-6">
                  {/* Product Image */}
                  <div className="relative w-24 h-24 flex-shrink-0 bg-accent-1 rounded-lg overflow-hidden">
                    <Image
                      src={item.product.node.image?.sourceUrl || '/placeholder.png'}
                      alt={item.product.node.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <Link href={`/producto/${item.product.node.slug}`}>
                      <h3 className="text-lg font-medium text-accent-9 hover:text-primary transition-colors mb-1">
                        {item.product.node.name}
                      </h3>
                    </Link>
                    
                    {item.variation && (
                      <p className="text-sm text-accent-6 mb-2">
                        {item.variation.node.name.split(' - ')[1]}
                      </p>
                    )}

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center border border-accent-2 rounded-lg">
                        <button
                          onClick={() =>
                            handleQuantityUpdate(
                              item.key,
                              item.quantity,
                              -1,
                              cartItems,
                            )
                          }
                          disabled={updateCartProcessing}
                          className="p-2 hover:bg-accent-1 disabled:opacity-50 transition-colors"
                          aria-label="Disminuir cantidad"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        
                        <span className="px-4 py-2 text-sm font-medium min-w-[3rem] text-center">
                          {item.quantity}
                        </span>
                        
                        <button
                          onClick={() =>
                            handleQuantityUpdate(
                              item.key,
                              item.quantity,
                              1,
                              cartItems,
                            )
                          }
                          disabled={updateCartProcessing}
                          className="p-2 hover:bg-accent-1 disabled:opacity-50 transition-colors"
                          aria-label="Aumentar cantidad"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => handleRemoveProduct(item.key, cartItems)}
                        disabled={updateCartProcessing}
                        className="p-2 text-accent-6 hover:text-red-500 transition-colors disabled:opacity-50"
                        aria-label="Eliminar producto"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <p className="text-lg font-medium text-accent-9">
                      {item.subtotal}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary - 1/3 width */}
        <div className="lg:col-span-1">
          <div className="bg-accent-1 rounded-lg p-6 sticky top-4">
            <h2 className="text-xl font-medium mb-6">Resumen del Pedido</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-accent-7">
                <span>Subtotal</span>
                <span>{cartTotal}</span>
              </div>
              <div className="flex justify-between text-accent-7">
                <span>Envío</span>
                <span>Calculado al finalizar</span>
              </div>
              <div className="border-t border-accent-3 pt-4">
                <div className="flex justify-between text-lg font-medium">
                  <span>Total</span>
                  <span>{cartTotal}</span>
                </div>
              </div>
            </div>

            {!isCheckoutPage && (
              <Link href="/pagar" className="block">
                <Button variant="primary" fullWidth>
                  Proceder al Pago
                </Button>
              </Link>
            )}

            <Link href="/productos" className="block mt-4">
              <button className="w-full text-center text-sm text-accent-7 hover:text-primary transition-colors">
                Continuar comprando
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {updateCartProcessing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-lg p-8 text-center">
            <LoadingSpinner />
            <p className="mt-4 text-accent-7">Actualizando carrito...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartContents;