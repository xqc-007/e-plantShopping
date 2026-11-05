import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems, selectCartQuantity, selectCartTotal, removeItem, updateQuantity } from './CartSlice.jsx';
import { formatPrice } from './plants.js';

export default function CartItem() {
  const items = useSelector(selectCartItems);
  const quantity = useSelector(selectCartQuantity);
  const total = useSelector(selectCartTotal);
  const dispatch = useDispatch();
  const [checkoutMessage, setCheckoutMessage] = useState('');
  return (
    <div className="cart-page page-shell">
      <div className="page-heading"><span className="eyebrow">A LITTLE GREEN, ALMOST HOME</span><h1>Your growing <em>collection.</em></h1><p>{quantity ? `${quantity} ${quantity === 1 ? 'plant' : 'plants'} picked for your own little paradise.` : 'Good things start with a little green.'}</p></div>
      {items.length === 0 ? <section className="empty-cart"><span aria-hidden="true">❧</span><h2>Your cart is ready to grow.</h2><p>Find a leafy companion and make yourself at home.</p><a href="#/plants" className="button">Continue Shopping <svg aria-hidden="true" width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 16 16 4M5 4h11v11" /></svg></a></section> :
        <div className="cart-layout"><section className="cart-items" aria-label="Shopping cart items">
          <div className="cart-table-heading"><span>YOUR PLANTS</span><span>QUANTITY & TOTAL</span></div>
          {items.map(item => <article className="cart-item" key={item.id} aria-label={item.name}>
            <img className="cart-thumbnail" src={item.image} alt={item.name} width="130" height="130" />
            <div className="cart-item-info"><h2>{item.name}</h2><p>Unit price: {formatPrice(item.price)}</p><button className="delete-button" onClick={() => { dispatch(removeItem(item.id)); setCheckoutMessage(''); }} aria-label={`Delete ${item.name}`}>Delete</button></div>
            <div className="cart-item-controls"><div className="quantity-control"><button aria-label={`Decrease ${item.name} quantity`} onClick={() => { dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 })); setCheckoutMessage(''); }}>−</button><span aria-label={`${item.name} quantity`} aria-live="polite">{item.quantity}</span><button aria-label={`Increase ${item.name} quantity`} onClick={() => { dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 })); setCheckoutMessage(''); }}>+</button></div><p className="line-total">{formatPrice(item.price * item.quantity)}</p></div>
          </article>)}
          <a href="#/plants" className="continue-link">← Continue Shopping</a>
        </section>
        <aside className="order-summary"><span className="eyebrow">GOOD THINGS ARE GROWING</span><h2>Order summary</h2><div className="summary-line"><span>Total plants</span><span data-testid="total-quantity">{quantity}</span></div><div className="summary-line"><span>Subtotal</span><span>{formatPrice(total)}</span></div><div className="summary-total"><span>Total</span><strong data-testid="cart-total">{formatPrice(total)}</strong></div><p className="summary-note">All prices in USD. This is a learning project; purchases and delivery are not available.</p><button className="button checkout-button" onClick={() => setCheckoutMessage('Coming Soon — checkout is not available yet. Thank you for exploring Paradise Nursery!')}>Checkout <svg aria-hidden="true" width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 16 16 4M5 4h11v11" /></svg></button><p className="checkout-message" role="status">{checkoutMessage}</p></aside>
      </div>}
    </div>
  );
}
