// Imports
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';
import { ShoppingCart, Check, Loader2 } from 'lucide-react';

// State
import { useCartStore } from '@/stores/cartStore';

// Utils
import { getFormattedCart } from '@/utils/functions/functions';

// GraphQL
import { GET_CART } from '@/utils/gql/GQL_QUERIES';
import { ADD_TO_CART } from '@/utils/gql/GQL_MUTATIONS';

interface IImage {
  __typename: string;
  id: string;
  uri: string;
  title: string;
  srcSet: string;
  sourceUrl: string;
}

interface IVariationNode {
  __typename: string;
  name: string;
}

interface IAllPaColors {
  __typename: string;
  nodes: IVariationNode[];
}

interface IAllPaSizes {
  __typename: string;
  nodes: IVariationNode[];
}

export interface IVariationNodes {
  __typename: string;
  id: string;
  databaseId: number;
  name: string;
  stockStatus: string;
  stockQuantity: number;
  purchasable: boolean;
  onSale: boolean;
  salePrice?: string;
  regularPrice: string;
}

interface IVariations {
  __typename: string;
  nodes: IVariationNodes[];
}

export interface IProduct {
  __typename: string;
  id: string;
  databaseId: number;
  averageRating: number;
  slug: string;
  description: string;
  onSale: boolean;
  image: IImage;
  name: string;
  salePrice?: string;
  regularPrice: string;
  price: string;
  stockQuantity: number;
  allPaColors?: IAllPaColors;
  allPaSizes?: IAllPaSizes;
  variations?: IVariations;
}

export interface IProductRootObject {
  product: IProduct;
  variationId?: number;
  fullWidth?: boolean;
}

/**
 * Modern Add to Cart button with loading states and animations
 * @param {IProductRootObject} product - Product data
 * @param {number} variationId - Variation ID
 * @param {boolean} fullWidth - Whether the button should be full-width
 */
const AddToCart = ({
  product,
  variationId,
  fullWidth = false,
}: IProductRootObject) => {
  const { syncWithWooCommerce, isLoading: isCartLoading } = useCartStore();
  const [requestError, setRequestError] = useState<boolean>(false);
  const [addedToCart, setAddedToCart] = useState<boolean>(false);

  const productId = product?.databaseId ? product?.databaseId : variationId;

  const productQueryInput = {
    clientMutationId: uuidv4(),
    productId,
  };

  // Get cart data query
  const { data, refetch } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      const updatedCart = getFormattedCart(data);
      if (updatedCart) {
        syncWithWooCommerce(updatedCart);
      }
    },
  });

  // Add to cart mutation
  const [addToCart, { loading: addToCartLoading }] = useMutation(ADD_TO_CART, {
    variables: {
      input: productQueryInput,
    },
    onCompleted: () => {
      // Update the cart with new values
      refetch();
      setAddedToCart(true);
      
      // Reset the success state after 3 seconds
      setTimeout(() => {
        setAddedToCart(false);
      }, 3000);
    },
    onError: () => {
      setRequestError(true);
      setTimeout(() => {
        setRequestError(false);
      }, 3000);
    },
  });

  const handleAddToCart = () => {
    addToCart();
    // Refetch cart after 2 seconds
    setTimeout(() => {
      refetch();
    }, 2000);
  };

  const isLoading = addToCartLoading || isCartLoading;
  const isDisabled = isLoading || requestError;

  return (
    <button
      onClick={handleAddToCart}
      disabled={isDisabled}
      className={`group relative overflow-hidden ${
        fullWidth ? 'w-full' : ''
      } h-14 px-8 flex items-center justify-center gap-3 bg-primary text-white rounded-xl font-semibold text-base
      hover:bg-accent-8 active:scale-95
      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary
      transition-all duration-300 shadow-lg hover:shadow-xl
      ${addedToCart ? 'bg-green-500 hover:bg-green-600' : ''}
      ${requestError ? 'bg-red-500 hover:bg-red-600' : ''}`}
    >
      {/* Background animation on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet/20 to-pink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <div className="relative flex items-center gap-3">
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Agregando...</span>
          </>
        ) : addedToCart ? (
          <>
            <Check className="w-5 h-5 animate-bounce" />
            <span>¡Agregado al Carrito!</span>
          </>
        ) : requestError ? (
          <>
            <span className="text-lg">⚠️</span>
            <span>Error al agregar</span>
          </>
        ) : (
          <>
            <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Agregar al Carrito</span>
          </>
        )}
      </div>

      {/* Ripple effect on click */}
      {!isDisabled && (
        <div className="absolute inset-0 opacity-0 group-active:opacity-100 transition-opacity">
          <div className="absolute inset-0 bg-white/20 rounded-xl animate-ping" />
        </div>
      )}
    </button>
  );
};

export default AddToCart;