import { renderProducts } from "./ui.js";

export function initializeSearch(products) {

    const searchBox = document.getElementById("searchBox");

    if (!searchBox) return;

    searchBox.addEventListener("input", (event) => {

        const searchText = event.target.value
            .toLowerCase()
            .trim();

        const filteredProducts = products.filter(product => {

            return (

                product.name.toLowerCase().includes(searchText) ||

                product.category.toLowerCase().includes(searchText) ||

                product.description.toLowerCase().includes(searchText)

            );

        });

        renderProducts(filteredProducts);

    });

}