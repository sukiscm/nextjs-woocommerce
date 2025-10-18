// Imports
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Star, StarHalf, Package, Shield, Truck, Heart, Share2, ChevronLeft, ChevronRight } from 'lucide-react';

// Utils
import { filteredVariantPrice, paddedPrice } from '@/utils/functions/functions';

// Components
import AddToCart, { IProductRootObject } from './AddToCart.component';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner.component';

const SingleProduct = ({ product }: IProductRootObject) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedVariation, setSelectedVariation] = useState<number>();
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const placeholderFallBack = 'https://via.placeholder.com/600';

  let DESCRIPTION_WITHOUT_HTML;

  useEffect(() => {
    setIsLoading(false);
    if (product.variations) {
      const firstVariant = product.variations.nodes[0].databaseId;
      setSelectedVariation(firstVariant);
    }
  }, [product.variations]);

  let { description, image, name, onSale, price, regularPrice, salePrice, averageRating } = product;

  // Add padding/empty character after currency symbol here
  if (price) {
    price = paddedPrice(price, 'kr');
  }
  if (regularPrice) {
    regularPrice = paddedPrice(regularPrice, 'kr');
  }
  if (salePrice) {
    salePrice = paddedPrice(salePrice, 'kr');
  }

  // Strip out HTML from description
  if (typeof window !== 'undefined') {
    DESCRIPTION_WITHOUT_HTML = new DOMParser().parseFromString(
      description,
      'text/html',
    ).body.textContent;
  }

  // Mock gallery images (en un caso real, vendrían del producto)
  const galleryImages = [
    image?.sourceUrl || placeholderFallBack,
    image?.sourceUrl || placeholderFallBack,
    image?.sourceUrl || placeholderFallBack,
  ];

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="w-5 h-5 fill-yellow-400 text-yellow-400" />);
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-5 h-5 text-accent-3" />);
    }
    return stars;
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <section className="bg-white pb-12">
      {isLoading ? (
        <div className="h-56 mt-20">
          <p className="text-xl font-bold text-center">Cargando producto...</p>
          <br />
          <LoadingSpinner />
        </div>
      ) : (
        <div className="container-custom py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-accent-6 mb-8">
            <a href="/" className="hover:text-accent-9 transition-colors">Inicio</a>
            <span>/</span>
            <a href="/productos" className="hover:text-accent-9 transition-colors">Productos</a>
            <span>/</span>
            <span className="text-accent-9">{name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Gallery Section */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-accent-1 group">
                <Image
                  src={galleryImages[selectedImage]}
                  alt={name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  quality={90}
                />
                
                {/* Sale Badge */}
                {onSale && (
                  <div className="absolute top-4 left-4 px-4 py-2 bg-pink rounded-full shadow-lg">
                    <span className="text-white font-bold text-sm">OFERTA</span>
                  </div>
                )}

                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft className="w-5 h-5 text-accent-9" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight className="w-5 h-5 text-accent-9" />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-4">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === idx
                        ? 'border-primary ring-2 ring-primary/20'
                        : 'border-accent-2 hover:border-accent-4'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${name} - ${idx + 1}`}
                      width={120}
                      height={120}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info Section */}
            <div className="space-y-6">
              {/* Header */}
              <div className="space-y-2">
                <h1 className="text-3xl lg:text-4xl font-bold text-accent-9">
                  {name}
                </h1>
                
                {/* Rating */}
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {renderStars(averageRating || 4.5)}
                  </div>
                  <span className="text-accent-6">
                    {averageRating || '4.5'} (127 reseñas)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="py-4 border-y border-accent-2">
                {onSale ? (
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-bold text-pink">
                      {product.variations
                        ? filteredVariantPrice(price, '')
                        : salePrice}
                    </span>
                    <span className="text-2xl text-accent-5 line-through">
                      {product.variations
                        ? filteredVariantPrice(price, 'right')
                        : regularPrice}
                    </span>
                    <span className="px-3 py-1 bg-pink/10 text-pink rounded-full text-sm font-semibold">
                      AHORRA {Math.round(((parseFloat(regularPrice?.replace(/[^0-9.]/g, '') || '0') - parseFloat(salePrice?.replace(/[^0-9.]/g, '') || '0')) / parseFloat(regularPrice?.replace(/[^0-9.]/g, '') || '1')) * 100)}%
                    </span>
                  </div>
                ) : (
                  <span className="text-4xl font-bold text-accent-9">{price}</span>
                )}
              </div>

              {/* Description */}
              <div>
                <h3 className="font-semibold text-accent-9 mb-2">Descripción</h3>
                <p className="text-accent-6 leading-relaxed">
                  {DESCRIPTION_WITHOUT_HTML}
                </p>
              </div>

              {/* Stock Status */}
              {Boolean(product.stockQuantity) && (
                <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <Package className="w-5 h-5 text-green-600" />
                  <span className="text-green-700 font-semibold">
                    En Stock - {product.stockQuantity} disponibles
                  </span>
                </div>
              )}

              {/* Variations */}
              {product.variations && (
                <div className="space-y-3">
                  <label className="block font-semibold text-accent-9">
                    Selecciona una variante:
                  </label>
                  <select
                    className="w-full px-4 py-3 bg-white border-2 border-accent-2 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    onChange={(e) => setSelectedVariation(Number(e.target.value))}
                  >
                    {product.variations.nodes.map(({ id, name, databaseId, stockQuantity }) => (
                      <option key={id} value={databaseId}>
                        {name.split('- ').pop()} - ({stockQuantity} en stock)
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="space-y-3">
                <label className="block font-semibold text-accent-9">
                  Cantidad:
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center bg-accent-1 hover:bg-accent-2 rounded-lg transition-colors"
                  >
                    -
                  </button>
                  <span className="w-16 text-center text-xl font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center bg-accent-1 hover:bg-accent-2 rounded-lg transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <div className="flex-1">
                  {product.variations ? (
                    <AddToCart
                      product={product}
                      variationId={selectedVariation}
                      fullWidth={true}
                    />
                  ) : (
                    <AddToCart product={product} fullWidth={true} />
                  )}
                </div>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`w-14 h-14 flex items-center justify-center rounded-xl border-2 transition-all ${
                    isFavorite
                      ? 'bg-pink border-pink text-white'
                      : 'bg-white border-accent-2 text-accent-6 hover:border-pink hover:text-pink'
                  }`}
                >
                  <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
                <button className="w-14 h-14 flex items-center justify-center bg-white border-2 border-accent-2 text-accent-6 hover:border-accent-9 hover:text-accent-9 rounded-xl transition-all">
                  <Share2 className="w-6 h-6" />
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
                <div className="flex items-center gap-3 p-4 bg-accent-0 rounded-xl">
                  <div className="w-12 h-12 bg-violet/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Truck className="w-6 h-6 text-violet" />
                  </div>
                  <div>
                    <p className="font-semibold text-accent-9 text-sm">Envío Gratis</p>
                    <p className="text-xs text-accent-6">En pedidos +$50</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-accent-0 rounded-xl">
                  <div className="w-12 h-12 bg-pink/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-pink" />
                  </div>
                  <div>
                    <p className="font-semibold text-accent-9 text-sm">Garantía</p>
                    <p className="text-xs text-accent-6">30 días devolución</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-accent-0 rounded-xl">
                  <div className="w-12 h-12 bg-cyan/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Package className="w-6 h-6 text-cyan" />
                  </div>
                  <div>
                    <p className="font-semibold text-accent-9 text-sm">Empaque</p>
                    <p className="text-xs text-accent-6">Seguro y discreto</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SingleProduct;