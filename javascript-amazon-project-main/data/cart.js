import {validDeliverOption} from "./deliverOptions.js";


export let cart;
loadFromStarage();

export function loadFromStarage(){
    cart = JSON.parse(localStorage.getItem('cart'))||[];
}


function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId){
    let matchingItem;
    cart.forEach((item)=>{
        if(productId===item.productId){
            matchingItem=item;
        }
    });

    if (matchingItem){
        matchingItem.quantity+=1;
    }else {
        cart.push({
            productId: productId,
            quantity: 1,
            deliveryOptionId: '1'
        });
    }

    saveToStorage();
}
export function removeFromCart(productId){
    const newCart=[];
    cart.forEach((cartItem)=>{
       if (cartItem.productId !== productId){
           newCart.push(cartItem);
       }
    });
    cart=newCart;

    saveToStorage();
}
export function updateDeliverOption(productId, deliverOptionId){
    let matchingItem;
    cart.forEach((item)=>{
        if(productId===item.productId){
            matchingItem=item;
        }
    });
    if(!matchingItem){
        return;
    }
    if (!validDeliverOption(deliverOptionId)){
        return;
    }

    matchingItem.deliveryOptionId=deliverOptionId;
    saveToStorage();
}
export function updateQuantity(productId, newQuantity){
    let matchingItem;

    cart.forEach((cartItem)=>{
        if(cartItem.productId===productId){
            matchingItem=cartItem;
        }
    });
    matchingItem.quantity=newQuantity;
    saveToStorage();
}

export async function loadCartFetch() {
    const response = await fetch('https://supersimplebackend.dev/cart');
    const text = await response.text();
    console.log(text);
    return text;
}

export function loadCart(fun){
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load',()=> {
        console.log(xhr.response);
        fun();
    });

    xhr.open('GET','https://supersimplebackend.dev/cart');
    xhr.send();
}

export function resetCart() {
    cart = [];
    saveToStorage();
}