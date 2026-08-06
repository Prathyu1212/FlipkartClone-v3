import { addToCart } from "./cart.js";

export function renderProductDetails(product) {

    const container = document.getElementById("productDetails");

    if (!container) return;

    container.innerHTML = `

    <div class="product-page">

        <div class="product-image">

            <img
                src="${product.image}"
                alt="${product.name}">

        </div>

        <div class="product-information">

            <h1>${product.name}</h1>

            <p class="rating">

                ⭐ ${product.rating}

            </p>

            <h2 class="price">

                ₹${product.price.toLocaleString("en-IN")}

            </h2>

            <h3>Category</h3>

            <p>${product.category}</p>

            <h3>Description</h3>

            <p>${product.description}</p>

            <div class="product-buttons">

                <button
                    id="addToCartBtn">

                    Add To Cart

                </button>

                <button
                    id="buyNowBtn">

                    Buy Now

                </button>

            </div>

        </div>

    </div>

    `;

    document
        .getElementById("addToCartBtn")
        .addEventListener("click", () => {

            addToCart(product);

            alert(`${product.name} added to cart`);

        });

    document
        .getElementById("buyNowBtn")
        .addEventListener("click", () => {

            addToCart(product);

            location.href = "cart.html";

        });

}