// src/components/Product/ProductGridVercel.tsx
import ProductCardVercel from './ProductCardVercel';

interface Product {
  databaseId: number;
  name: string;
  price: string;
  regularPrice: string;
  salePrice?: string;
  onSale: boolean;
  slug: string;
  image?: {
    sourceUrl?: string;
  };
}

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
}

export default function ProductGridVercel({ products, loading }: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-square bg-accent-2 rounded-lg mb-4" />
            <div className="h-4 bg-accent-2 rounded mb-2" />
            <div className="h-4 bg-accent-2 rounded w-2/3 mb-2" />
            <div className="h-4 bg-accent-2 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-1 rounded-full mb-4">
          <svg
            className="w-8 h-8 text-accent-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        </div>
        <p className="text-xl text-accent-6 mb-2">No se encontraron productos</p>
        <p className="text-sm text-accent-5">Intenta con otra búsqueda o categoría</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCardVercel
          key={product.databaseId}
          databaseId={product.databaseId}
          name={product.name}
          price={product.price}
          regularPrice={product.regularPrice}
          salePrice={product.salePrice}
          onSale={product.onSale}
          slug={product.slug}
          image={product.image}
        />
      ))}
    </div>
  );
}