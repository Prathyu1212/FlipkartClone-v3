import { products } from "./products.js";
import { renderProductDetails } from "./productUI.js";

const urlParams = new URLSearchParams(window.location.search);

const productId = Number(urlParams.get("id"));

const product = products.find(item => item.id === productId);

if (product) {

    renderProductDetails(product);

} else {

    document.getElementById("productDetails").innerHTML = `

        <h2>Product Not Found</h2>

    `;

}