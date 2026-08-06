import { products } from "./products.js";
import { renderProducts } from "./ui.js";
import { addToCart, updateCartCount } from "./cart.js";
import { initializeSearch } from "./search.js";

renderProducts(products);

initializeSearch(products);

updateCartCount();

const productsContainer = document.getElementById("productsContainer");

productsContainer.addEventListener("click", (event) => {

    if (!event.target.classList.contains("add-cart")) {

        return;

    }

    const productId = Number(event.target.dataset.id);

    const product = products.find(item => item.id === productId);

    if (product) {

        addToCart(product);

        alert(`${product.name} added to cart`);

    }

});