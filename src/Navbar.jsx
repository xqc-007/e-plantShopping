import { useSelector } from 'react-redux';
import { selectCartQuantity } from './CartSlice.jsx';

export default function Navbar({ page }) {
  const quantity = useSelector(selectCartQuantity);
  return (
    <header className="site-header">
      <a className="brand" href="#/" aria-label="Paradise Nursery home">
        <span className="brand-mark" aria-hidden="true">❧</span>
        <span>paradise<span className="brand-sub">N U R S E R Y</span></span>
      </a>
      <nav aria-label="Main navigation">
        <a href="#/" aria-current={page === 'home' ? 'page' : undefined}>Home</a>
        <a href="#/plants" aria-current={page === 'plants' ? 'page' : undefined}>Plants</a>
        <a className="cart-link" href="#/cart" aria-current={page === 'cart' ? 'page' : undefined} aria-label={`Cart, ${quantity} ${quantity === 1 ? 'item' : 'items'}`}>
          <svg width="23" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M6 7h12l2 14H4L6 7Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>
          <span className="cart-word">Cart</span><span className="cart-count" aria-live="polite">{quantity}</span>
        </a>
      </nav>
    </header>
  );
}
