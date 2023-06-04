// @ts-nocheck
import {cartStore} from "./Stores/CartStore";

const cartController = (() => {

    async function addItem(item) {
        let cart = sessionStorage.getItem("cart") != null ? JSON.parse(sessionStorage.getItem("cart")) : null;
        if (cart == null) return;

        // Check if item is already in cart
        let itemInCart = cart.items.find(i => i.name === item.name);

        if (itemInCart != null) {
            itemInCart.quantity += Number(item.quantity);

            // Update general totals
            cart.totalQty += Number(item.quantity);
            cart.total += Number(item.price) * Number(item.quantity);

            // Save cart in session storage
            cartStore.set(cart);
            return;
        }

        cart.totalQty += Number(item.quantity);
        cart.items.push(item);
        cart.total += (Number(item.price) * Number(item.quantity));

        cartStore.set(cart);
    }

    async function removeItem(item) {
        let cart = sessionStorage.getItem("cart") != null ? JSON.parse(sessionStorage.getItem("cart")) : null;
        if (cart == null) return;

        // Find item in cart
        let itemInCart = cart.items.find(i => i.name === item.name);
        if (itemInCart == null) return;

        // Remove item quantity from total quantity
        cart.totalQty -= Number(item.quantity);

        // Remove total price of item from cart
        cart.total -= (Number(item.price) * Number(item.quantity));

        // Remove item from cart
        cart.items = cart.items.filter(i => i.name !== item.name);

        cartStore.set(cart);
    }

    async function getCart() {
        let cart = sessionStorage.getItem("cart") != null ? JSON.parse(sessionStorage.getItem("cart")) : null;
        if (cart == null) return null;

        return cart;
    }

    async function clearCart() {
        let cart = sessionStorage.getItem("cart") != null ? JSON.parse(sessionStorage.getItem("cart")) : null;
        if (cart == null) return;

        cart.items = [];
        cart.total = 0;
        cart.totalQty = 0;
        
        cartStore.set(cart);
    }

    return {
        addItem,
        removeItem,
        getCart,
        clearCart
    }
})();

export default cartController;