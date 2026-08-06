export function renderProducts(products) {

    const container = document.getElementById("productsContainer");

    if (!container) return;

    container.innerHTML = "";

    if (products.length === 0) {

        container.innerHTML = "<h2>No Products Found</h2>";

        return;

    }

    products.forEach(product => {

        container.innerHTML += `

        <div class="product-card">

            <a href="pages/product.html?id=${product.id}">

                <img
                    src="${product.image}"
                    alt="${product.name}">

            </a>

            <h3>${product.name}</h3>

            <p>${product.category}</p>

            <p>⭐ ${product.rating}</p>

            <p class="price">

                ₹${product.price.toLocaleString("en-IN")}

            </p>

            <button
                class="add-cart"
                data-id="${product.id}">

                Add To Cart

            </button>

        </div>

        `;

    });

}