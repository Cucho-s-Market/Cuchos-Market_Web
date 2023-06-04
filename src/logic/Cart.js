// @ts-nocheck
import { writable } from 'svelte/store';

// Get cart items from sessionStorage or initialize an empty array
const storedCartItems = JSON.parse(sessionStorage.getItem('cart')) || {items: [], total: 0};

// Create writable store for cart items
export const cart = writable(storedCartItems);

// Subscribe to cart changes and store them in sessionStorage
cart.subscribe(value => {
  sessionStorage.setItem('cart', JSON.stringify(value));
});