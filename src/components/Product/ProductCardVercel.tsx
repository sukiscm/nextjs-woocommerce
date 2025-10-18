// src/components/Product/ProductCardVercel.tsx
import Link from 'next/link';
import Image from 'next/image';
import { paddedPrice } from '@/utils/functions/functions';
import clsx from 'clsx';

interface ProductCardProps {
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

const ProductCardVercel = ({
  databaseId,
  name,
  price,
  regularPrice,
  salePrice,
  onSale,
  slug,
  image,
}: ProductCardProps) => {
  // Formatear precios
  const formattedPrice = price ? paddedPrice(price, 'kr') : price;
  const formattedRegularPrice = regularPrice ? paddedPrice(regularPrice, 'kr') : regularPrice;
  const formattedSalePrice = salePrice ? paddedPrice(salePrice, 'kr') : salePrice;

  // Calcular descuento
  const discount = onSale && regularPrice && salePrice 
    ? Math.round(((parseFloat(regularPrice.replace(/[^0-9.]/g, '')) - parseFloat(salePrice.replace(/[^0-9.]/g, ''))) / parseFloat(regularPrice.replace(/[^0-9.]/g, ''))) * 100)
    : 0;

  // Determinar si es nuevo (últimos 30 días) - simplificado
  const isNew = databaseId % 5 === 0; // Placeholder - ajusta según tu lógica

  return (
    <Link href={`/produkt/${slug}`} className="group block">
      <div className="relative overflow-hidden rounded-lg bg-white border border-accent-1 transition-all duration-350 hover:shadow-magical hover:border-accent-3">
        {/* Imagen del producto */}
        <div className="aspect-square overflow-hidden bg-accent-1 relative">
          {image?.sourceUrl ? (
            <Image
              src={image.sourceUrl}
              alt={name}
              fill
              className="object-cover object-center transition-transform duration-350 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="h-full w-full bg-accent-1 flex items-center justify-center">
              <svg
                className="w-24 h-24 text-accent-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            {onSale && discount > 0 && (
              <div className="bg-pink text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-fadeIn">
                -{discount}%
              </div>
            )}
            {isNew && !onSale && (
              <div className="bg-violet text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-fadeIn">
                Nuevo
              </div>
            )}
          </div>

          {/* Overlay sutil en hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-black/0 to-black/0 group-hover:from-black/10 group-hover:via-black/5 transition-all duration-350" />
        </div>

        {/* Información del producto */}
        <div className="p-3">
          {/* Nombre del producto */}
          <h3 className="font-semibold text-sm text-accent-9 mb-1.5 line-clamp-2 min-h-[2.5rem] group-hover:text-violet transition-colors">
            {name}
          </h3>

          {/* Precio */}
          <div className="flex items-center gap-2 flex-wrap">
            {onSale ? (
              <>
                <span className="text-base font-bold text-pink">
                  {formattedSalePrice}
                </span>
                <span className="text-xs text-accent-5 line-through">
                  {formattedRegularPrice}
                </span>
              </>
            ) : (
              <span className="text-base font-bold text-accent-9">
                {formattedPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCardVercel;