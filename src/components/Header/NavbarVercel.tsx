// src/components/Header/NavbarVercel.tsx
import { useState, Fragment } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ShoppingCart, Search, Menu, X, User, ChevronDown } from 'lucide-react'
import { Dialog, Transition } from '@headlessui/react'
import clsx from 'clsx'

// ✅ Importar del store de Zustand que YA existe en tu proyecto
import { useCartStore } from '@/stores/cartStore'

interface NavItem {
  name: string
  href: string
  children?: { name: string; href: string }[]
}

const navigation: NavItem[] = [
  {
    name: 'Productos',
    href: '/produkter',
    children: [
      { name: 'Réplicas Eléctricas', href: '/kategori/replicas-electricas' },
      { name: 'Réplicas de Gas', href: '/kategori/replicas-gas' },
      { name: 'Accesorios', href: '/kategori/accesorios' },
      { name: 'Protección', href: '/kategori/proteccion' },
    ],
  },
  { name: 'Kategorier', href: '/kategorier' },
]

export default function NavbarVercel() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  // ✅ Obtener carrito desde Zustand (tu store existente)
  const cart = useCartStore((state) => state.cart)
  const totalItems = cart?.totalProductsCount || 0

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/buscar?q=${encodeURIComponent(searchQuery)}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  return (
    <>
      {/* Navbar principal */}
      <header className="sticky top-0 z-50 bg-white border-b border-accent-2 backdrop-blur-custom bg-white/95">
        <nav className="container-custom">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2 group">
                <div className="w-10 h-10 bg-gradient-to-br from-violet to-pink rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:scale-105 transition-transform">
                  A
                </div>
                <span className="text-xl font-bold text-accent-9 hidden sm:block">
                  Airsoft MX
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigation.map((item) => (
                <div key={item.name} className="relative group">
                  <Link
                    href={item.href}
                    className={clsx(
                      'flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                      router.pathname === item.href
                        ? 'text-accent-9 bg-accent-1'
                        : 'text-accent-7 hover:text-accent-9 hover:bg-accent-1'
                    )}
                  >
                    {item.name}
                    {item.children && (
                      <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform" />
                    )}
                  </Link>

                  {/* Dropdown menu */}
                  {item.children && (
                    <div className="absolute left-0 top-full mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="bg-white rounded-lg shadow-magical border border-accent-2 py-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block px-4 py-2 text-sm text-accent-7 hover:text-accent-9 hover:bg-accent-1 transition-colors"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              {/* Search button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 hover:bg-accent-1 rounded-lg transition-colors"
                aria-label="Buscar"
              >
                <Search className="w-5 h-5 text-accent-7" />
              </button>

              {/* User account (desktop) */}
              <Link
                href="/logg-inn"
                className="hidden md:flex p-2 hover:bg-accent-1 rounded-lg transition-colors"
                aria-label="Mi cuenta"
              >
                <User className="w-5 h-5 text-accent-7" />
              </Link>

              {/* Cart */}
              <Link
                href="/handlekurv"
                className="relative p-2 hover:bg-accent-1 rounded-lg transition-colors group"
                aria-label="Carrito de compras"
              >
                <ShoppingCart className="w-5 h-5 text-accent-7 group-hover:text-accent-9 transition-colors" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-violet text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-fadeIn">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-accent-1 rounded-lg transition-colors"
                aria-label="Menú"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-accent-7" />
                ) : (
                  <Menu className="w-6 h-6 text-accent-7" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <Transition
            show={mobileMenuOpen}
            enter="transition duration-200 ease-out"
            enterFrom="opacity-0 -translate-y-2"
            enterTo="opacity-100 translate-y-0"
            leave="transition duration-150 ease-in"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-2"
          >
            <div className="lg:hidden py-4 border-t border-accent-2">
              <div className="flex flex-col space-y-1">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={clsx(
                        'block px-4 py-3 rounded-lg text-base font-medium transition-colors',
                        router.pathname === item.href
                          ? 'text-accent-9 bg-accent-1'
                          : 'text-accent-7 hover:text-accent-9 hover:bg-accent-1'
                      )}
                    >
                      {item.name}
                    </Link>
                    {item.children && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block px-4 py-2 text-sm text-accent-6 hover:text-accent-9 hover:bg-accent-1 rounded-lg transition-colors"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <Link
                  href="/logg-inn"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg text-base font-medium text-accent-7 hover:text-accent-9 hover:bg-accent-1 transition-colors"
                >
                  Mi Cuenta
                </Link>
              </div>
            </div>
          </Transition>
        </nav>
      </header>

      {/* Search Modal */}
      <Transition show={searchOpen} as={Fragment}>
        <Dialog onClose={() => setSearchOpen(false)} className="relative z-50">
          {/* Backdrop */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          </Transition.Child>

          {/* Modal */}
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-start justify-center p-4 pt-20">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white shadow-magical transition-all">
                  <form onSubmit={handleSearch} className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent-5" />
                    <input
                      type="text"
                      placeholder="Buscar productos..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                      className="w-full pl-12 pr-4 py-4 text-lg bg-white border-b border-accent-2 focus:outline-none focus:border-violet transition-colors"
                    />
                  </form>
                  
                  {/* Sugerencias de búsqueda */}
                  <div className="p-4">
                    <p className="text-sm text-accent-5 mb-3">Búsquedas populares</p>
                    <div className="flex flex-wrap gap-2">
                      {['AK-47', 'M4', 'Pistolas', 'Máscaras', 'BBs'].map((term) => (
                        <button
                          key={term}
                          onClick={() => {
                            setSearchQuery(term)
                            router.push(`/buscar?q=${term}`)
                            setSearchOpen(false)
                          }}
                          className="px-3 py-1.5 bg-accent-1 hover:bg-accent-2 rounded-full text-sm text-accent-7 transition-colors"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}