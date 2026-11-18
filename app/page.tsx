'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { ArrowRight, ChevronDown, Heart, Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react'

const categories = [
  { name: 'Moda mujer', image: 'photo-1483985988355-763728e1935b' },
  { name: 'Moda hombre', image: 'photo-1516257984-b1b4d707412e' },
  { name: 'Hogar', image: 'photo-1616486338812-3dadae4b4ace' },
  { name: 'Tecnología', image: 'photo-1498049794561-7780e7231661' },
  { name: 'Belleza', image: 'photo-1596462502278-27bfdc403348' },
]

const products = [
  { name: 'Bolso mini Verona', category: 'Accesorios', price: '$49.90', oldPrice: '$69.90', image: 'photo-1584917865442-de89df76afd3', badge: '−28%' },
  { name: 'Vestido midi floral', category: 'Moda mujer', price: '$59.00', oldPrice: '', image: 'photo-1515372039744-b8f02a3ae446', badge: 'NUEVO' },
  { name: 'Tenis urbanos Classic', category: 'Calzado', price: '$74.95', oldPrice: '$89.00', image: 'photo-1542291026-7eec264c27ff', badge: '−16%' },
  { name: 'Lentes de sol Riviera', category: 'Accesorios', price: '$34.50', oldPrice: '', image: 'photo-1511499767150-a48a237f0083', badge: 'MÁS VENDIDO' },
]

const photo = (id: string, width = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`

export default function Page() {
  const [favorites, setFavorites] = useState<string[]>([])
  const [cart, setCart] = useState(0)
  const [search, setSearch] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const filtered = useMemo(() => products.filter((product) => `${product.name} ${product.category}`.toLowerCase().includes(search.toLowerCase())), [search])

  return (
    <main className="storefront">
      <div className="announcement">Envío gratis en compras mayores a $75 <span>·</span> Compra ahora, paga después</div>
      <header className="site-header">
        <button className="icon-button mobile-menu" aria-label="Abrir menú" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        <a className="wordmark" href="#inicio" aria-label="Simon inicio">Simon<span>.</span></a>
        <nav className={`main-nav ${menuOpen ? 'open' : ''}`} aria-label="Navegación principal">
          <a href="#novedades">Novedades</a><a href="#categorias">Mujer</a><a href="#categorias">Hombre</a><a href="#categorias">Hogar</a><a href="#productos">Belleza</a><a className="nav-sale" href="#productos">Ofertas</a>
        </nav>
        <div className="header-actions">
          <label className="search-box"><Search size={18} /><input aria-label="Buscar productos" placeholder="¿Qué estás buscando?" value={search} onChange={(event) => setSearch(event.target.value)} />{search && <button aria-label="Limpiar búsqueda" onClick={() => setSearch('')}><X size={16} /></button>}</label>
          <button className="icon-button account-button" aria-label="Mi cuenta"><UserRound /></button>
          <button className="icon-button bag-button" aria-label={`Bolsa de compras, ${cart} artículos`}><ShoppingBag /><span>{cart}</span></button>
        </div>
      </header>

      <section className="hero" id="inicio" aria-label="Colección nueva temporada">
        <Image src="/simon-campaign.png" alt="Modelo con vestido coral en un jardín iluminado" fill priority sizes="100vw" className="hero-image" />
        <div className="hero-shade" />
        <div className="hero-copy"><p className="eyebrow">NUEVA TEMPORADA · 2026</p><h1>Vestite de<br /><em>lo que viene.</em></h1><p className="hero-description">Piezas para todos tus momentos.<br />Descubrí una nueva forma de sentirte bien.</p><a className="button-light" href="#productos">Explorar colección <ArrowRight size={17} /></a><div className="hero-pagination"><span className="active" /><span /><span /><small>01 / 03</small></div></div>
        <div className="hero-note">ESPECIAL DE TEMPORADA <span>·</span> SIMON, PARA VOS</div>
      </section>

      <div className="service-strip"><div><span className="service-icon">01</span><p><strong>Envío a todo El Salvador</strong><small>Recibí donde estés</small></p></div><div><span className="service-icon">02</span><p><strong>Pagá como prefirás</strong><small>Hasta 12 cuotas</small></p></div><div><span className="service-icon">03</span><p><strong>Comprá con confianza</strong><small>Cambios fáciles y seguros</small></p></div></div>

      <section className="category-section page-section" id="categorias"><div className="section-heading"><div><p className="eyebrow green">ENCONTRÁ TU ESTILO</p><h2>Un mundo por descubrir</h2></div><a className="text-link" href="#productos">Ver todas las categorías <ArrowRight size={16} /></a></div><div className="category-grid">{categories.map((category, index) => <a className={`category-card category-${index}`} href="#productos" key={category.name}><Image src={photo(category.image, 700)} alt="" fill sizes="(max-width: 700px) 50vw, 20vw" /><span>{category.name}<ArrowRight size={17} /></span></a>)}</div></section>

      <section className="feature-banner" id="novedades"><div className="feature-left"><p className="eyebrow">HASTA 40% OFF</p><h2>Pequeños detalles,<br />grandes momentos.</h2><p>Elegí ese regalo que dice todo sin decir una palabra.</p><a className="button-green" href="#productos">Descubrir regalos <ArrowRight size={16} /></a></div><div className="feature-art" role="img" aria-label="Estilo cálido y natural para regalar"><div className="feature-orb orb-one"/><div className="feature-orb orb-two"/><div className="feature-stamp">HECHO<br />PARA<br /><i>vos</i></div><span className="feature-caption">UNA SELECCIÓN SIMON</span></div></section>

      <section className="products-section page-section" id="productos"><div className="section-heading"><div><p className="eyebrow green">SELECCIÓN SIMON</p><h2>{search ? 'Resultados de búsqueda' : 'Favoritos de la semana'}</h2></div><a className="text-link" href="#categorias">Ver todo <ArrowRight size={16} /></a></div>{filtered.length ? <div className="product-grid">{filtered.map((product) => <article className="product-card" key={product.name}><div className="product-image"><Image src={photo(product.image, 800)} alt={product.name} fill sizes="(max-width: 700px) 50vw, 25vw" /><span className="product-badge">{product.badge}</span><button className={`favorite-button ${favorites.includes(product.name) ? 'selected' : ''}`} aria-label={favorites.includes(product.name) ? `Quitar ${product.name} de favoritos` : `Agregar ${product.name} a favoritos`} onClick={() => setFavorites((current) => current.includes(product.name) ? current.filter((name) => name !== product.name) : [...current, product.name])}><Heart size={19} fill={favorites.includes(product.name) ? 'currentColor' : 'none'} /></button><button className="quick-add" onClick={() => setCart((count) => count + 1)}>Agregar a la bolsa</button></div><div className="product-info"><p>{product.category}</p><h3>{product.name}</h3><div className="product-price"><strong>{product.price}</strong>{product.oldPrice && <del>{product.oldPrice}</del>}</div></div></article>)}</div> : <p className="no-results">No encontramos productos para “{search}”. Probá con otra búsqueda.</p>}</section>

      <section className="newsletter"><div><p className="eyebrow">UN POQUITO DE SIMON EN TU INBOX</p><h2>Inspiración que llega.</h2><p>Novedades, favoritos y beneficios pensados para vos.</p></div><form onSubmit={(event) => { event.preventDefault(); alert('¡Gracias por sumarte a Simon!') }}><label className="sr-only" htmlFor="newsletter-email">Tu correo electrónico</label><input id="newsletter-email" type="email" placeholder="Tu correo electrónico" required /><button type="submit">Quiero suscribirme <ArrowRight size={16} /></button></form></section>

      <footer className="site-footer"><a className="wordmark footer-mark" href="#inicio">Simon<span>.</span></a><p>Elegí sentirte bien.</p><div className="footer-links"><a href="#categorias">Ayuda y contacto</a><a href="#categorias">Tiendas</a><a href="#categorias">Términos y condiciones</a><span>© 2026 Simon, S.A. de C.V.</span></div></footer>
    </main>
  )
}
