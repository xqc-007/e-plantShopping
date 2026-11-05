import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, selectCartItems } from './CartSlice.jsx';
import { plantCategories, formatPrice } from './plants.js';

export default function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const [activeCategory, setActiveCategory] = useState('All plants');
  const [announcement, setAnnouncement] = useState('');
  const visibleCategories = plantCategories.filter(category => activeCategory === 'All plants' || activeCategory === category.name);
  const handleAdd = plant => {
    dispatch(addItem(plant));
    setAnnouncement(`${plant.name} added to your cart.`);
  };

  return (
    <div className="shop-page page-shell">
      <div className="page-heading"><span className="eyebrow">THE GREEN COLLECTION</span><h1>Find your kind of <em>green.</em></h1><p>A windowsill companion. A statement leaf. A whole new beginning.</p></div>
      <div className="category-tabs" role="group" aria-label="Filter plants by category">
        {['All plants', ...plantCategories.map(category => category.name)].map(name => <button key={name} onClick={() => setActiveCategory(name)} aria-pressed={activeCategory === name}>{name}</button>)}
      </div>
      <p className="sr-only" role="status">{announcement}</p>
      {visibleCategories.map(category => (
        <section className="category-section" key={category.name} aria-labelledby={category.name.replaceAll(' ', '-')}>
          <div className="category-heading"><div><h2 id={category.name.replaceAll(' ', '-')}>{category.name}</h2><p>{category.description}</p></div><span className="category-number">06 PLANTS</span></div>
          <div className="product-grid">{category.plants.map(plant => {
            const isAdded = cartItems.some(item => item.id === plant.id);
            return <article className="plant-card" key={plant.id}>
              <div className="plant-image-wrap"><img src={plant.image} alt={plant.name} loading="lazy" width="400" height="400" /><span className="care-tag">{plant.care}</span></div>
              <div className="plant-card-body"><div className="plant-title"><h3>{plant.name}</h3><span>{formatPrice(plant.price)}</span></div><p>{plant.description}</p>
                <button className="add-button" onClick={() => handleAdd(plant)} disabled={isAdded} aria-label={`${isAdded ? 'Added to cart' : 'Add to Cart'}: ${plant.name}`}>{isAdded ? 'Added to Cart ✓' : 'Add to Cart'}<span aria-hidden="true">{isAdded ? '' : '+'}</span></button>
              </div>
            </article>;
          })}</div>
        </section>
      ))}
    </div>
  );
}
