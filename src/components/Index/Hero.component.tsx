import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Sparkles, TrendingUp, Shield } from 'lucide-react';

/**
 * Modern Hero section with animations and visual effects
 * @function Hero
 * @returns {JSX.Element} - Rendered component
 */
const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative w-full min-h-[85vh] overflow-hidden bg-gradient-to-br from-accent-0 via-white to-accent-1">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgb(203 213 225 / 0.15) 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }} />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-violet/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-pink/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />

      <div className="container-custom relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[85vh] py-12">
          {/* Left Content */}
          <div className={`space-y-8 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-accent-2 hover:shadow-md transition-shadow">
              <Sparkles className="w-4 h-4 text-violet" />
              <span className="text-sm font-medium text-accent-7">
                Nuevo para 2025
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-accent-9 leading-tight">
                Tienda Moderna
                <span className="block text-gradient">
                  de Airsoft
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-accent-6 max-w-xl">
                Descubre nuestra colección curada de productos de calidad a precios increíbles
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/productos"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Explorar Productos
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/categorias"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-accent-9 rounded-xl font-semibold border-2 border-accent-2 hover:border-accent-9 hover:shadow-lg transition-all duration-300"
              >
                Ver Categorías
              </Link>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-violet/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-violet" />
                </div>
                <div>
                  <p className="font-semibold text-accent-9">Mejores Precios</p>
                  <p className="text-sm text-accent-6">Garantizado</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-pink/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-pink" />
                </div>
                <div>
                  <p className="font-semibold text-accent-9">Pago Seguro</p>
                  <p className="text-sm text-accent-6">100% protegido</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-cyan/10 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-cyan" />
                </div>
                <div>
                  <p className="font-semibold text-accent-9">Envío Rápido</p>
                  <p className="text-sm text-accent-6">15-25 días</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className={`relative transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-violet/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-pink/20 rounded-full blur-2xl" />
            
            {/* Main Image Container */}
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="/images/hero.jpg"
                alt="Hero showcase"
                fill
                priority
                className="object-cover hover:scale-105 transition-transform duration-700"
                quality={90}
              />
              
              {/* Overlay Badge */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="backdrop-blur-md bg-white/90 rounded-2xl p-4 shadow-lg border border-white/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-accent-6 font-medium">Popular ahora</p>
                      <p className="text-lg font-bold text-accent-9">Colección Premium</p>
                    </div>
                    <div className="px-4 py-2 bg-gradient-to-r from-violet to-pink rounded-lg">
                      <p className="text-white font-bold">-30%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Stats */}
            <div className="absolute -left-4 top-1/4 backdrop-blur-md bg-white/90 rounded-2xl p-4 shadow-xl border border-white/20 animate-float">
              <p className="text-2xl font-bold text-accent-9">500+</p>
              <p className="text-sm text-accent-6">Productos</p>
            </div>
            
            <div className="absolute -right-4 bottom-1/3 backdrop-blur-md bg-white/90 rounded-2xl p-4 shadow-xl border border-white/20 animate-float animation-delay-2000">
              <p className="text-2xl font-bold text-accent-9">⭐ 4.9</p>
              <p className="text-sm text-accent-6">Calificación</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path 
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
            fill="white"
          />
        </svg>
      </div>

      {/* Animations CSS */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;