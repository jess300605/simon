'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { ArrowRight, Heart, Menu, Minus, Plus, Search, ShoppingBag, Trash2, UserRound, X } from 'lucide-react'

type Product = { name: string; category: string; price: string; oldPrice: string; image: string; badge: string }
type CartLine = { product: Product; quantity: number }

const categories = [
  { name: 'Moda mujer', image: 'photo-1483985988355-763728e1935b' },
  { name: 'Moda hombre', image: 'photo-1516257984-b1b4d707412e' },
  { name: 'Hogar', image: 'photo-1616486338812-3dadae4b4ace' },
  { name: 'Tecnología', image: 'photo-1498049794561-7780e7231661' },
  { name: 'Belleza', image: 'photo-1596462502278-27bfdc403348' },
]

const products: Product[] = [
  { name: 'Bolso mini Verona', category: 'Accesorios', price: '$49.90', oldPrice: '$69.90', image: 'photo-1584917865442-de89df76afd3', badge: '−28%' },
  { name: 'Vestido midi floral', category: 'Moda mujer', price: '$59.00', oldPrice: '', image: 'photo-1515372039744-b8f02a3ae446', badge: 'NUEVO' },
  { name: 'Tenis urbanos Classic', category: 'Calzado', price: '$74.95', oldPrice: '$89.00', image: 'photo-1542291026-7eec264c27ff', badge: '−16%' },
  { name: 'Lentes de sol Riviera', category: 'Accesorios', price: '$34.50', oldPrice: '', image: 'photo-1511499767150-a48a237f0083', badge: 'MÁS VENDIDO' },
  { name: 'Camisa lino esencial', category: 'Moda hombre', price: '$42.00', oldPrice: '', image: 'photo-1598033129183-c4f50c736f10', badge: 'NUEVO' },
  { name: 'Vela botánica', category: 'Hogar', price: '$18.00', oldPrice: '', image: 'photo-1603006905003-be475563bc59', badge: 'FAVORITO' },
  { name: 'Audífonos Studio', category: 'Tecnología', price: '$89.00', oldPrice: '$109.00', image: 'photo-1505740420928-5e560c06d30e', badge: '−18%' },
  { name: 'Set cuidado diario', category: 'Belleza', price: '$27.50', oldPrice: '', image: 'photo-1608248543803-ba4f8c70ae0b', badge: 'NUEVO' },
]

const photo = (id: string, width = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`
const priceValue = (price: string) => Number(price.replace(/[^\d.]/g, ''))
const formatPrice = (price: number) => `$${price.toFixed(2)}`

export default function Page() {
  const [favorites, setFavorites] = useState<string[]>([])
  const [cart, setCart] = useState<CartLine[]>([])
  const [search, setSearch] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const [checkout, setCheckout] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [notice, setNotice] = useState('')
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const filtered = useMemo(() => products.filter((product) => `${product.name} ${product.category}`.toLowerCase().includes(search.trim().toLowerCase())), [search])
  const cartCount = cart.reduce((total, line) => total + line.quantity, 0)
  const subtotal = cart.reduce((total, line) => total + priceValue(line.product.price) * line.quantity, 0)
  const amountForFreeShipping = Math.max(0, 75 - subtotal)

  function addToCart(product: Product) {
    setCart((current) => {
      const existing = current.find((line) => line.product.name === product.name)
      return existing
        ? current.map((line) => line.product.name === product.name ? { ...line, quantity: line.quantity + 1 } : line)
        : [...current, { product, quantity: 1 }]
    })
    setNotice(`${product.name} se agregó a tu bolsa`)
    window.setTimeout(() => setNotice(''), 2600)
  }

  function changeQuantity(name: string, delta: number) {
    setCart((current) => current.map((line) => line.product.name === name ? { ...line, quantity: line.quantity + delta } : line).filter((line) => line.quantity > 0))
  }

  function openCart() {
    setCartOpen(true)
    setCheckout(false)
    setOrderPlaced(false)
  }

  function chooseCategory(name: string) {
    setSearch(name)
    setMenuOpen(false)
    document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className="storefront">
      <div className="announcement">Envío gratis en compras mayores a $75 <span>·</span> Compra ahora, paga después</div>
      <header className="site-header">
        <button className="icon-button mobile-menu" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        <a className="wordmark" href="#inicio" aria-label="Simon inicio">Simon<span>.</span></a>
        <nav className={`main-nav ${menuOpen ? 'open' : ''}`} aria-label="Navegación principal">
          <a href="#novedades" onClick={() => setMenuOpen(false)}>Novedades</a>
          {categories.map((category) => <a href="#productos" key={category.name} onClick={() => chooseCategory(category.name)}>{category.name.replace('Moda ', '').replace(/^./, (letter) => letter.toUpperCase())}</a>)}
          <a className="nav-sale" href="#productos" onClick={() => chooseCategory('')}>Ofertas</a>
        </nav>
        <div className="header-actions">
          <label className="search-box"><Search size={18} /><input aria-label="Buscar productos" placeholder="¿Qué estás buscando?" value={search} onChange={(event) => setSearch(event.target.value)} />{search && <button type="button" aria-label="Limpiar búsqueda" onClick={() => setSearch('')}><X size={16} /></button>}</label>
          <button className="icon-button account-button" aria-label="Mi cuenta" onClick={() => setAccountOpen(true)}><UserRound /></button>
          <button className="icon-button bag-button" aria-label={`Abrir bolsa de compras, ${cartCount} artículos`} onClick={openCart}><ShoppingBag /><span>{cartCount}</span></button>
        </div>
      </header>

      <section className="hero" id="inicio" aria-label="Colección nueva temporada">
        <Image src="/simon-campaign.png" alt="Modelo con vestido coral en un jardín iluminado" fill priority sizes="100vw" className="hero-image" />
        <div className="hero-shade" />
        <div className="hero-copy"><p className="eyebrow">NUEVA TEMPORADA · 2026</p><h1>Vestite de<br /><em>lo que viene.</em></h1><p className="hero-description">Piezas para todos tus momentos.<br />Descubrí una nueva forma de sentirte bien.</p><a className="button-light" href="#productos">Explorar colección <ArrowRight size={17} /></a><div className="hero-pagination"><span className="active" /><span /><span /><small>01 / 03</small></div></div>
        <div className="hero-note">ESPECIAL DE TEMPORADA <span>·</span> SIMON, PARA VOS</div>
      </section>

      <div className="service-strip"><div><span className="service-icon">01</span><p><strong>Envío a todo El Salvador</strong><small>Recibí donde estés</small></p></div><div><span className="service-icon">02</span><p><strong>Pagá como prefirás</strong><small>Hasta 12 cuotas</small></p></div><div><span className="service-icon">03</span><p><strong>Comprá con confianza</strong><small>Cambios fáciles y seguros</small></p></div></div>

      <section className="category-section page-section" id="categorias"><div className="section-heading"><div><p className="eyebrow green">ENCONTRÁ TU ESTILO</p><h2>Un mundo por descubrir</h2></div><a className="text-link" href="#productos" onClick={() => setSearch('')}>Ver todas las categorías <ArrowRight size={16} /></a></div><div className="category-grid">{categories.map((category, index) => <a className={`category-card category-${index}`} href="#productos" key={category.name} onClick={() => chooseCategory(category.name)}><Image src={photo(category.image, 700)} alt="" fill sizes="(max-width: 700px) 50vw, 20vw" /><span>{category.name}<ArrowRight size={17} /></span></a>)}</div></section>

      <section className="feature-banner" id="novedades"><div className="feature-left"><p className="eyebrow">HASTA 40% OFF</p><h2>Pequeños detalles,<br />grandes momentos.</h2><p>Elegí ese regalo que dice todo sin decir una palabra.</p><a className="button-green" href="#productos" onClick={() => setSearch('')}>Descubrir regalos <ArrowRight size={16} /></a></div><div className="feature-art" role="img" aria-label="Estilo cálido y natural para regalar"><div className="feature-orb orb-one"/><div className="feature-orb orb-two"/><div className="feature-stamp">HECHO<br />PARA<br /><i>vos</i></div><span className="feature-caption">UNA SELECCIÓN SIMON</span></div></section>

      <section className="products-section page-section" id="productos"><div className="section-heading"><div><p className="eyebrow green">SELECCIÓN SIMON</p><h2>{search ? `Productos: ${search}` : 'Favoritos de la semana'}</h2></div><button className="text-link link-button" onClick={() => setSearch('')}>Ver todo <ArrowRight size={16} /></button></div>{filtered.length ? <div className="product-grid">{filtered.map((product) => <article className="product-card" key={product.name}><div className="product-image"><Image src={photo(product.image, 800)} alt={product.name} fill sizes="(max-width: 700px) 50vw, 25vw" /><span className="product-badge">{product.badge}</span><button className={`favorite-button ${favorites.includes(product.name) ? 'selected' : ''}`} aria-label={favorites.includes(product.name) ? `Quitar ${product.name} de favoritos` : `Agregar ${product.name} a favoritos`} onClick={() => setFavorites((current) => current.includes(product.name) ? current.filter((name) => name !== product.name) : [...current, product.name])}><Heart size={19} fill={favorites.includes(product.name) ? 'currentColor' : 'none'} /></button><button className="quick-add" onClick={() => addToCart(product)}>Agregar a la bolsa</button></div><div className="product-info"><p>{product.category}</p><h3>{product.name}</h3><div className="product-price"><strong>{product.price}</strong>{product.oldPrice && <del>{product.oldPrice}</del>}</div></div></article>)}</div> : <div className="no-results"><p>No encontramos productos para “{search}”.</p><button className="text-link link-button" onClick={() => setSearch('')}>Ver todos los productos <ArrowRight size={16} /></button></div>}</section>

      <section className="newsletter"><div><p className="eyebrow">UN POQUITO DE SIMON EN TU INBOX</p><h2>{subscribed ? '¡Ya sos parte!' : 'Inspiración que llega.'}</h2><p>{subscribed ? `Gracias por tu interés, ${newsletterEmail}. Esta suscripción es una demostración.` : 'Novedades, favoritos y beneficios pensados para vos.'}</p></div><form onSubmit={(event) => { event.preventDefault(); setSubscribed(true) }}><label className="sr-only" htmlFor="newsletter-email">Tu correo electrónico</label><input id="newsletter-email" type="email" placeholder="Tu correo electrónico" value={newsletterEmail} onChange={(event) => setNewsletterEmail(event.target.value)} required disabled={subscribed} /><button type="submit" disabled={subscribed}>{subscribed ? 'Suscripción confirmada' : 'Quiero suscribirme'} {!subscribed && <ArrowRight size={16} />}</button></form></section>

      <footer className="site-footer"><a className="wordmark footer-mark" href="#inicio">Simon<span>.</span></a><p>Elegí sentirte bien.</p><div className="footer-links"><a href="#categorias">Ayuda y contacto</a><a href="#categorias">Tiendas</a><a href="#categorias">Términos y condiciones</a><span>© 2026 Simon, S.A. de C.V.</span></div></footer>

      {accountOpen && <div className="drawer-backdrop account-backdrop" onClick={(event) => { if (event.target === event.currentTarget) setAccountOpen(false) }}><section className="account-dialog" role="dialog" aria-modal="true" aria-labelledby="account-title"><button className="icon-button account-close" aria-label="Cerrar mi cuenta" onClick={() => setAccountOpen(false)}><X /></button><span className="account-icon"><UserRound /></span><p className="eyebrow green">BIENVENIDA A SIMON</p><h2 id="account-title">Tu estilo, a tu manera.</h2><p>La cuenta personal todavía no está habilitada en esta demostración. Podés seguir explorando y completar una compra de prueba como invitada.</p><button className="checkout-button" onClick={() => { setAccountOpen(false); document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' }) }}>Continuar como invitada <ArrowRight size={16} /></button></section></div>}
      {notice && <div className="cart-notice" role="status"><span>{notice}</span><button onClick={openCart}>Ver bolsa <ArrowRight size={14} /></button></div>}
      {cartOpen && <div className="drawer-backdrop" onClick={(event) => { if (event.target === event.currentTarget) setCartOpen(false) }} onKeyDown={(event) => { if (event.key === 'Escape') setCartOpen(false) }}>
        <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
          <div className="drawer-header"><div><p className="eyebrow green">SIMON · TU SELECCIÓN</p><h2 id="cart-title">{orderPlaced ? '¡Gracias por tu pedido!' : checkout ? 'Finalizar compra' : `Tu bolsa (${cartCount})`}</h2></div><button className="icon-button" aria-label="Cerrar bolsa" onClick={() => setCartOpen(false)}><X /></button></div>
          {orderPlaced ? <div className="order-success"><span className="success-mark">✓</span><h3>Pedido de demostración confirmado</h3><p>Este prototipo no procesa pagos reales. Tu selección quedó lista para continuar.</p><button className="button-green" onClick={() => { setCartOpen(false); setOrderPlaced(false); setCart([]) }}>Seguir explorando <ArrowRight size={16} /></button></div> : checkout ? <form className="checkout-form" onSubmit={(event) => { event.preventDefault(); setOrderPlaced(true); setCheckout(false) }}><p className="checkout-intro">Completá tus datos para revisar el pedido. No se realizará ningún cobro.</p><label>Nombre completo<input autoComplete="name" required placeholder="Tu nombre" /></label><label>Correo electrónico<input autoComplete="email" type="email" required placeholder="nombre@correo.com" /></label><label>Dirección de entrega<input autoComplete="street-address" required placeholder="Calle, número y colonia" /></label><label>Departamento<select required defaultValue=""><option value="" disabled>Seleccioná tu departamento</option><option>San Salvador</option><option>La Libertad</option><option>Santa Ana</option><option>San Miguel</option><option>Otro</option></select></label><div className="checkout-total"><span>Total de demostración</span><strong>{formatPrice(subtotal)}</strong></div><button className="checkout-button" type="submit">Confirmar pedido de prueba <ArrowRight size={16} /></button><button className="back-to-cart" type="button" onClick={() => setCheckout(false)}>Volver a mi bolsa</button></form> : cart.length ? <><div className="shipping-progress"><p>{amountForFreeShipping ? <>Te faltan <strong>{formatPrice(amountForFreeShipping)}</strong> para envío gratis</> : <strong>¡Tu envío es gratis!</strong>}</p><div><span style={{ width: `${Math.min((subtotal / 75) * 100, 100)}%` }} /></div></div><div className="cart-lines">{cart.map(({ product, quantity }) => <article className="cart-line" key={product.name}><div className="cart-line-image"><Image src={photo(product.image, 240)} alt={product.name} fill sizes="88px" /></div><div className="cart-line-content"><p>{product.category}</p><h3>{product.name}</h3><strong>{product.price}</strong><div className="quantity-control"><button aria-label={`Quitar una unidad de ${product.name}`} onClick={() => changeQuantity(product.name, -1)}><Minus size={13} /></button><span>{quantity}</span><button aria-label={`Agregar una unidad de ${product.name}`} onClick={() => changeQuantity(product.name, 1)}><Plus size={13} /></button></div></div><div className="cart-line-end"><strong>{formatPrice(priceValue(product.price) * quantity)}</strong><button aria-label={`Eliminar ${product.name}`} onClick={() => setCart((current) => current.filter((line) => line.product.name !== product.name))}><Trash2 size={16} /></button></div></article>)}</div><div className="cart-summary"><div><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div><p>Envío calculado al finalizar la compra.</p><button className="checkout-button" onClick={() => setCheckout(true)}>Continuar con la compra <ArrowRight size={16} /></button><button className="back-to-cart" onClick={() => setCartOpen(false)}>Seguir explorando</button></div></> : <div className="empty-cart"><ShoppingBag size={34} strokeWidth={1.3} /><h3>Tu bolsa está esperando</h3><p>Cuando encuentres algo que te encante, lo vas a ver acá.</p><button className="button-green" onClick={() => setCartOpen(false)}>Explorar productos <ArrowRight size={16} /></button></div>}
        </aside>
      </div>}
    </main>
  )
}
