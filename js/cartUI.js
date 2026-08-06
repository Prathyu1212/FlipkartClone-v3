import { getCart } from "./storage.js";

import {

    increaseQuantity,

    decreaseQuantity,

    removeItem,

    getCartTotal

} from "./cart.js";

export function renderCart() {

    const container = document.getElementById("cartContainer");

    if (!container) return;

    const cart = getCart();

    if (cart.length === 0) {

        container.innerHTML = `

            <div class="empty-cart">

                <h2>Your Cart is Empty</h2>

                <p>Add some products to continue shopping.</p>

                <button onclick="location.href='../index.html'">

                    Continue Shopping

                </button>

            </div>

        `;

        return;

    }

    container.innerHTML = "";

    cart.forEach(item => {

        container.innerHTML += `

        <div class="cart-card">

            <img src="${item.image}" alt="${item.name}">

            <div class="cart-details">

                <h2>${item.name}</h2>

                <p>${item.category}</p>

                <h3>

                    ₹${item.price.toLocaleString("en-IN")}

                </h3>

                <div class="quantity-controls">

                    <button
                        class="minus"
                        data-id="${item.id}">

                        -

                    </button>

                    <span>${item.quantity}</span>

                    <button
                        class="plus"
                        data-id="${item.id}">

                        +

                    </button>

                </div>

                <button
                    class="remove"
                    data-id="${item.id}">

                    Remove

                </button>

            </div>

        </div>

        `;

    });

    container.innerHTML += `

        <div class="cart-total">

            <h2>Grand Total</h2>

            <h1>

                ₹${getCartTotal().toLocaleString("en-IN")}

            </h1>

        </div>

    `;

    addCartEvents();

}

function addCartEvents() {

    document.querySelectorAll(".plus").forEach(button => {

        button.addEventListener("click", () => {

            increaseQuantity(Number(button.dataset.id));

            renderCart();

        });

    });

    document.querySelectorAll(".minus").forEach(button => {

        button.addEventListener("click", () => {

            decreaseQuantity(Number(button.dataset.id));

            renderCart();

        });

    });

    document.querySelectorAll(".remove").forEach(button => {

        button.addEventListener("click", () => {

            removeItem(Number(button.dataset.id));

            renderCart();

        });

    });

}