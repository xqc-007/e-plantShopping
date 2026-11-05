import { useEffect, useState } from 'react';
import Navbar from './Navbar.jsx';
import AboutUs from './AboutUs.jsx';
import ProductList from './ProductList.jsx';
import CartItem from './CartItem.jsx';
import './App.css';

function readPage() {
  const route = window.location.hash.replace(/^#\/?/, '');
  return ['plants', 'cart'].includes(route) ? route : 'home';
}

export default function App() {
  const [page, setPage] = useState(readPage);
  useEffect(() => {
    const handleNavigation = () => { setPage(readPage()); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', handleNavigation);
    return () => window.removeEventListener('hashchange', handleNavigation);
  }, []);
  useEffect(() => {
    document.title = `${page === 'home' ? 'A little green, a lot of joy' : page === 'plants' ? 'Shop plants' : 'Your cart'} | Paradise Nursery`;
  }, [page]);

  return (
    <>
      <a className="skip-link" href="#main-content" onClick={event => { event.preventDefault(); document.getElementById('main-content').focus(); }}>Skip to content</a>
      <div className="announcement">A little green. A lot of joy. <span>Find your next leafy companion.</span></div>
      <Navbar page={page} />
      <main id="main-content" tabIndex="-1">
        {page === 'home' && <>
          <section className="hero">
            <div className="hero-content"><span className="eyebrow">WELCOME TO PARADISE NURSERY</span><h1>Make room<br />for a little <em>green.</em></h1><p>Bring the outside in. Discover beautiful plants that turn your space into your own little paradise.</p><a href="#/plants" className="button button-light">Get Started <svg aria-hidden="true" width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 16 16 4M5 4h11v11" /></svg></a><div className="hero-note"><span aria-hidden="true">✳</span> Good things take a little growing.</div></div>
            <div className="hero-art" aria-hidden="true"><img src="images/hero.svg" alt="" /><span className="art-caption">YOUR EVERYDAY, A LITTLE GREENER.</span></div>
          </section>
          <div className="benefit-strip"><span>18 plants to fall in love with</span><span>Something for every space</span><span>Grow at your own pace</span></div>
          <AboutUs />
        </>}
        {page === 'plants' && <ProductList />}
        {page === 'cart' && <CartItem />}
      </main>
      <footer><a className="footer-brand" href="#/">Paradise Nursery</a><p>A little green for your everyday.</p><small>Course project · All prices in USD · Checkout coming soon</small></footer>
    </>
  );
}
