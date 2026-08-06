import { getCart, saveCart } from "./storage.js";

export function addToCart(product) {

    const cart = getCart();

    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    saveCart(cart);

    updateCartCount();

}

export function increaseQuantity(productId) {

    const cart = getCart();

    const product = cart.find(item => item.id === productId);

    if (product) {

        product.quantity++;

    }

    saveCart(cart);

    updateCartCount();

}

export function decreaseQuantity(productId) {

    let cart = getCart();

    const product = cart.find(item => item.id === productId);

    if (!product) return;

    product.quantity--;

    cart = cart.filter(item => item.quantity > 0);

    saveCart(cart);

    updateCartCount();

}

export function removeItem(productId) {

    const cart = getCart().filter(item => item.id !== productId);

    saveCart(cart);

    updateCartCount();

}

export function getCartItems() {

    return getCart();

}

export function getCartCount() {

    const cart = getCart();

    let count = 0;

    cart.forEach(item => {

        count += item.quantity;

    });

    return count;

}

export function getCartTotal() {

    const cart = getCart();

    let total = 0;

    cart.forEach(item => {

        total += item.price * item.quantity;

    });

    return total;

}

export function updateCartCount() {

    const cartButton = document.getElementById("cartBtn");

    if (!cartButton) return;

    cartButton.textContent = `Cart (${getCartCount()})`;

}