// @ts-nocheck
// @ts-nocheck
import { writable } from 'svelte/store';
import { browser } from "$app/environment";
// Create writable store for cart items
export const userStore = writable((browser && sessionStorage.getItem("user") != "null") ? JSON.parse(sessionStorage.getItem("user")) : null);

// Create writable for store cart in session storage
if (browser){
    userStore.subscribe(user => {
        sessionStorage.setItem("user", JSON.stringify(user));
    });
}   
