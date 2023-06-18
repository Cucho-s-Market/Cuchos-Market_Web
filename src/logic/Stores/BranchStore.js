// @ts-nocheck
import { writable } from 'svelte/store';
import { browser } from "$app/environment";
// Create writable store for cart items
export const branchStore = writable((browser && sessionStorage.getItem("branch") != null) ? JSON.parse(sessionStorage.getItem("branch")) : null);

// Create writable for store cart in session storage
if (browser){
    branchStore.subscribe(branch => {
        if(branch == null) sessionStorage.setItem("branch", null);
        else
        sessionStorage.setItem("branch", JSON.stringify(branch));
    });
}   
