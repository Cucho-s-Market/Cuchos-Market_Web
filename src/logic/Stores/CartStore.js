// @ts-nocheck
import { writable } from 'svelte/store';
import { browser } from "$app/environment";
// Create writable store for cart items
export const cartStore = writable((browser && sessionStorage.getItem("cart") != null) ? JSON.parse(sessionStorage.getItem("cart")) : null);

// Create writable for store cart in session storage
if (browser){
    cartStore.subscribe(cart => {
        sessionStorage.setItem("cart", JSON.stringify(cart));
    });
}   
