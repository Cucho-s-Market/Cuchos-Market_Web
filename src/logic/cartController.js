// @ts-nocheck
import {cart} from "./Cart";

const cartController = (() => {

    async function addItem(item) {
        let cart = sessionStorage.getItem("cart") != null ? JSON.parse(sessionStorage.getItem("cart")) : null;
        if (cart == null) return;

        // Check if item is already in cart
        let itemInCart = cart.items.find(i => i.name === item.name);

        if (itemInCart != null) {
            itemInCart.quantity += Number(item.quantity);
            cart.total += Number(item.price) * Number(item.quantity);
            sessionStorage.setItem("cart", JSON.stringify(cart));
            return;
        }

        cart.items.push(item);
        cart.total += (Number(item.price) * Number(item.quantity));
        sessionStorage.setItem("cart", JSON.stringify(cart));
    }

    async function removeItem(item) {
        let cart = sessionStorage.getItem("cart") != null ? JSON.parse(sessionStorage.getItem("cart")) : null;
        if (cart == null) return;

        // Find item in cart
        let itemInCart = cart.items.find(i => i.name === item.name);
        if (itemInCart == null) return;

        // Remove total price of item from cart
        cart.total -= (Number(item.price) * Number(item.quantity));

        // Remove item from cart
        cart.items = cart.items.filter(i => i.name !== item.name);

        sessionStorage.setItem("cart", JSON.stringify(cart));
    }

    async function getCart() {
        let cart = sessionStorage.getItem("cart") != null ? JSON.parse(sessionStorage.getItem("cart")) : null;
        if (cart == null) return null;

        return cart;
    }

    async function getQtyItems() {
        let cart = sessionStorage.getItem("cart") != null ? JSON.parse(sessionStorage.getItem("cart")) : null;
        if (cart == null) return 0;

        return cart.items.length;
    }

    async function clearCart() {
        let cart = sessionStorage.getItem("cart") != null ? JSON.parse(sessionStorage.getItem("cart")) : null;
        if (cart == null) return;

        cart.items = [];
        cart.total = 0;
        sessionStorage.setItem("cart", JSON.stringify(cart));
    }

    return {
        addItem,
        removeItem,
        getCart,
        getQtyItems,
        clearCart
    }
})();

export default cartController;