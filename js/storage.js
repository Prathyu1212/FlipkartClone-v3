const CART_KEY = "flipkart-cart";

export function getCart() {

    const cart = localStorage.getItem(CART_KEY);

    if(cart){

        return JSON.parse(cart);

    }

    return [];

}

export function saveCart(cart){

    localStorage.setItem(

        CART_KEY,

        JSON.stringify(cart)

    );

}

export function clearCart(){

    localStorage.removeItem(CART_KEY);

}