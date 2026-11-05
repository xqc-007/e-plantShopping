import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from '../src/App.jsx';
import { createAppStore } from '../src/store.js';
import { addItem, updateQuantity, removeItem, selectCartTotal, selectCartQuantity } from '../src/CartSlice.jsx';
import { allPlants, plantCategories } from '../src/plants.js';

describe('cart state and totals', () => {
  let store;
  beforeEach(() => { store = createAppStore(); });
  it('adds products and keeps one line per product', () => {
    store.dispatch(addItem(allPlants[0])); store.dispatch(addItem(allPlants[0]));
    expect(store.getState().cart.items).toHaveLength(1);
    expect(selectCartQuantity(store.getState())).toBe(2);
    expect(selectCartTotal(store.getState())).toBe(56);
  });
  it('calculates totals for mixed products and quantity changes', () => {
    store.dispatch(addItem(allPlants[0])); store.dispatch(addItem(allPlants[1]));
    store.dispatch(updateQuantity({ id: allPlants[0].id, quantity: 3 }));
    expect(selectCartQuantity(store.getState())).toBe(4);
    expect(selectCartTotal(store.getState())).toBe(106);
  });
  it('removes a product when its quantity reaches zero', () => {
    store.dispatch(addItem(allPlants[0]));
    store.dispatch(updateQuantity({ id: allPlants[0].id, quantity: 0 }));
    expect(store.getState().cart.items).toHaveLength(0);
  });
  it('rejects negative or noninteger quantities', () => {
    store.dispatch(addItem(allPlants[0]));
    for (const quantity of [-2, 1.5, NaN, Infinity]) store.dispatch(updateQuantity({ id: allPlants[0].id, quantity }));
    expect(selectCartQuantity(store.getState())).toBe(1);
  });
  it('deletes one item without affecting the others', () => {
    store.dispatch(addItem(allPlants[0])); store.dispatch(addItem(allPlants[1]));
    store.dispatch(removeItem(allPlants[0].id));
    expect(selectCartTotal(store.getState())).toBe(22);
  });
});

describe('shopping experience', () => {
  const navigate = route => { window.location.hash = route; fireEvent(window, new HashChangeEvent('hashchange')); };
  beforeEach(() => { window.location.hash = '#/plants'; });
  function setup() {
    const store = createAppStore();
    render(<Provider store={store}><App /></Provider>);
    return store;
  }
  it('provides 18 unique plants in three categories of six', () => {
    setup();
    expect(plantCategories).toHaveLength(3);
    expect(plantCategories.every(category => category.plants.length >= 6)).toBe(true);
    expect(new Set(allPlants.map(plant => plant.id)).size).toBe(18);
    expect(screen.getAllByRole('article')).toHaveLength(18);
  });
  it('adds, disables the button, updates the badge, and keeps the cart on navigation', () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: 'Add to Cart: Monstera Deliciosa' }));
    expect(screen.getByRole('button', { name: 'Added to cart: Monstera Deliciosa' })).toBeDisabled();
    expect(screen.getByRole('link', { name: 'Cart, 1 item' })).toBeInTheDocument();
    navigate('#/cart');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('$28.00');
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
  });
  it('increases and decreases quantities, calculates each line, and removes at zero', () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: 'Add to Cart: Monstera Deliciosa' }));
    navigate('#/cart');
    fireEvent.click(screen.getByRole('button', { name: 'Increase Monstera Deliciosa quantity' }));
    expect(screen.getByTestId('cart-total')).toHaveTextContent('$56.00');
    expect(screen.getByTestId('total-quantity')).toHaveTextContent('2');
    expect(within(screen.getByRole('article', { name: 'Monstera Deliciosa' })).getByText('$56.00')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Decrease Monstera Deliciosa quantity' }));
    expect(screen.getByTestId('cart-total')).toHaveTextContent('$28.00');
    fireEvent.click(screen.getByRole('button', { name: 'Decrease Monstera Deliciosa quantity' }));
    expect(screen.getByText('Your cart is ready to grow.')).toBeInTheDocument();
  });
  it('allows re-adding a deleted item and provides a checkout message', () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: 'Add to Cart: Snake Plant' }));
    navigate('#/cart');
    fireEvent.click(screen.getByRole('button', { name: /Checkout/ }));
    expect(screen.getByRole('status')).toHaveTextContent('Coming Soon');
    fireEvent.click(screen.getByRole('button', { name: 'Delete Snake Plant' }));
    expect(screen.getByRole('link', { name: /Continue Shopping/ })).toHaveAttribute('href', '#/plants');
    navigate('#/plants');
    expect(screen.getByRole('button', { name: 'Add to Cart: Snake Plant' })).toBeEnabled();
  });
  it('filters categories without modifying the cart', () => {
    const store = setup();
    fireEvent.click(screen.getByRole('button', { name: 'Add to Cart: Monstera Deliciosa' }));
    fireEvent.click(screen.getByRole('button', { name: 'Aromatic Plants', exact: true }));
    expect(screen.getAllByRole('article')).toHaveLength(6);
    expect(selectCartQuantity(store.getState())).toBe(1);
  });
  it('shows a landing page, company details, and Get Started link', () => {
    window.location.hash = '#/'; setup();
    expect(screen.getByRole('link', { name: /Get Started/ })).toHaveAttribute('href', '#/plants');
    expect(screen.getByText(/Welcome to Paradise Nursery, a little corner/)).toBeInTheDocument();
  });
});
