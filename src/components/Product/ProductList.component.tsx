// src/components/Product/ProductList.component.tsx
import { Product } from '@/types/product';
import { useProductFilters } from '@/hooks/useProductFilters';
import ProductCard from './ProductCard.component';
import ProductFilters from './ProductFilters.component';

interface ProductListProps {
  products: Product[];
  title: string;
}

const ProductList = ({ products, title }: ProductListProps) => {
  const {
    sortBy,
    setSortBy,
    selectedSizes,
    setSelectedSizes,
    selectedColors,
    setSelectedColors,
    priceRange,
    setPriceRange,
    productTypes,
    toggleProductType,
    resetFilters,
    filterProducts
  } = useProductFilters(products);

  const filteredProducts = filterProducts(products);

  return (
    <div className="py-12">
      {/* Header mejorado */}
      <div className="mb-8">
        <h1 className="text-4xl font-light mb-2 tracking-tight">
          {title}
        </h1>
        <p className="text-accent-6">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'produkt' : 'produkter'}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filtros - Mejorados visualmente */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="sticky top-4">
            <ProductFilters
              selectedSizes={selectedSizes}
              setSelectedSizes={setSelectedSizes}
              selectedColors={selectedColors}
              setSelectedColors={setSelectedColors}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              productTypes={productTypes}
              toggleProductType={toggleProductType}
              products={products}
              resetFilters={resetFilters}
            />
          </div>
        </aside>

        {/* Productos */}
        <div className="flex-1">
          {/* Sort bar mejorado */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-accent-2">
            <p className="text-sm text-accent-6">
              Viser {filteredProducts.length} resultater
            </p>
            
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm text-accent-7">
                Sorter:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border-accent-2 rounded-lg px-3 py-1.5 focus:border-primary focus:ring-1 focus:ring-primary"
              >
                <option value="popular">Populær</option>
                <option value="price-low">Pris: Lav til Høy</option>
                <option value="price-high">Pris: Høy til Lav</option>
                <option value="newest">Nyeste</option>
              </select>
            </div>
          </div>

          {/* Grid de productos */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product: Product) => (
                <ProductCard
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
          ) : (
            <div className="text-center py-12">
              <p className="text-accent-5 mb-4">Ingen produkter funnet</p>
              <button
                onClick={resetFilters}
                className="text-sm text-primary underline hover:no-underline"
              >
                Fjern filtre
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;