// src/components/Product/ProductFilters.component.tsx
import { Product, ProductType } from '@/types/product';
import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { Dispatch, SetStateAction, useState } from 'react';

interface ProductFiltersProps {
  selectedSizes: string[];
  setSelectedSizes: Dispatch<SetStateAction<string[]>>;
  selectedColors: string[];
  setSelectedColors: Dispatch<SetStateAction<string[]>>;
  priceRange: [number, number];
  setPriceRange: Dispatch<SetStateAction<[number, number]>>;
  productTypes: ProductType[];
  toggleProductType: (id: string) => void;
  products: Product[];
  resetFilters: () => void;
}

const ProductFilters = ({
  selectedSizes,
  setSelectedSizes,
  selectedColors,
  setSelectedColors,
  priceRange,
  setPriceRange,
  productTypes,
  toggleProductType,
  products,
  resetFilters,
}: ProductFiltersProps) => {
  const [expandedSections, setExpandedSections] = useState({
    type: true,
    price: true,
    size: true,
    color: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Get unique sizes and colors
  const sizes = Array.from(
    new Set(
      products.flatMap(
        (product: Product) =>
          product.allPaSizes?.nodes.map((node) => node.name) || [],
      ),
    ),
  ).sort();

  const availableColors = products
    .flatMap((product: Product) => product.allPaColors?.nodes || [])
    .filter((color, index, self) => 
      index === self.findIndex((c) => c.slug === color.slug)
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color],
    );
  };

  const FilterSection = ({ 
    title, 
    section, 
    children 
  }: { 
    title: string; 
    section: keyof typeof expandedSections; 
    children: React.ReactNode 
  }) => (
    <div className="border-b border-accent-2 pb-6 mb-6">
      <button
        onClick={() => toggleSection(section)}
        className="flex items-center justify-between w-full mb-4 text-left"
      >
        <h3 className="text-sm font-semibold tracking-wider uppercase">
          {title}
        </h3>
        {expandedSections[section] ? (
          <ChevronUp className="w-4 h-4 text-accent-5" />
        ) : (
          <ChevronDown className="w-4 h-4 text-accent-5" />
        )}
      </button>
      {expandedSections[section] && children}
    </div>
  );

  return (
    <div className="bg-white rounded-lg border border-accent-2 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Filtrer</h2>
        <button
          onClick={resetFilters}
          className="text-xs text-accent-6 hover:text-primary underline"
        >
          Fjern alle
        </button>
      </div>

      {/* Product Type */}
      <FilterSection title="Kategori" section="type">
        <div className="space-y-3">
          {productTypes.map((type) => (
            <label
              key={type.id}
              className="flex items-center cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={type.checked}
                onChange={() => toggleProductType(type.id)}
                className="w-4 h-4 rounded border-accent-3 text-primary focus:ring-primary"
              />
              <span className="ml-3 text-sm text-accent-7 group-hover:text-primary">
                {type.name}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Pris" section="price">
        <div className="space-y-4">
          <input
            type="range"
            min={0}
            max={1000}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="w-full h-2 bg-accent-2 rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex items-center justify-between text-sm text-accent-6">
            <span>kr {priceRange[0]}</span>
            <span>kr {priceRange[1]}</span>
          </div>
        </div>
      </FilterSection>

      {/* Sizes */}
      {sizes.length > 0 && (
        <FilterSection title="Størrelse" section="size">
          <div className="grid grid-cols-4 gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className={`
                  px-3 py-2 text-sm font-medium rounded-lg border transition-all
                  ${selectedSizes.includes(size)
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-accent-7 border-accent-2 hover:border-accent-4'
                  }
                `}
              >
                {size}
              </button>
            ))}
          </div>
        </FilterSection>
      )}

      {/* Colors */}
      {availableColors.length > 0 && (
        <FilterSection title="Farge" section="color">
          <div className="grid grid-cols-6 gap-3">
            {availableColors.map((color) => (
              <button
                key={color.slug}
                onClick={() => toggleColor(color.name)}
                className={`
                  w-10 h-10 rounded-full border-2 transition-all
                  bg-${color.slug}-500
                  ${selectedColors.includes(color.name)
                    ? 'border-primary ring-2 ring-primary ring-offset-2'
                    : 'border-accent-2 hover:border-accent-4'
                  }
                `}
                title={color.name}
                aria-label={color.name}
              />
            ))}
          </div>
        </FilterSection>
      )}
    </div>
  );
};

export default ProductFilters;