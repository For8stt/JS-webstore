import {cart, removeFromCart, updateDeliverOption} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from "./utils/money.js";
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions}from '../data/deliverOptions.js';

hello();
const today=dayjs();
const deliverDate=today.add(7,'days');
console.log(deliverDate.format('MMMM,dddd,D'));


let cartSummaryHTML='';

cart.forEach((cartItem)=>{
    const productId=cartItem.productId;
    let matchingProduct;

    products.forEach((product)=>{
        if(product.id===productId){
         matchingProduct=product;
        }
    });
    const deliverOptionId=cartItem.deliveryOptionId;
    let deliveryOption;
    deliveryOptions.forEach((option)=>{
        if (option===deliverOptionId){
            deliveryOption=option;
        }
    });

    // const today=dayjs();
    // const deliverDate=today.add(deliveryOption.deliveryDays, 'days');
    // const dateString=deliverDate.format('dddd, MMMM D');
    let dateString='';
    if (deliveryOption) {
        const today=dayjs();
        const deliverDate=today.add(deliveryOption.deliveryDays, 'days');
        dateString=deliverDate.format('dddd, MMMM D');
    }else {
        dateString='none'
    }

    cartSummaryHTML+=`
       <div class="cart-item-container 
            js-cart-item-container-${matchingProduct.id}">
                
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>
     
            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">
    
              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary 
                  js-delete-quantity-link" data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>
    
              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                  ${deliveryOptionHTML(matchingProduct,cartItem)}
               </div>
            </div>
      </div>
    `;
});
function deliveryOptionHTML(matchingProduct, cartItem){
    let html='';

deliveryOptions.forEach((deliveryOption)=>{
const today=dayjs();
const deliverDate=today.add(deliveryOption.deliveryDays,'days');
const dateString=deliverDate.format('dddd, MMMM D');
const priceString=deliveryOption.priceCents===0?'Free': `$${formatCurrency(deliveryOption.priceCents)}-`;

const isCheked=deliveryOption.id === cartItem.deliveryOptionId;

html+= `<div class="delivery-option js-delivery-option"
                   data-product-id="${matchingProduct.id}"
                   data-delivery-option-id="${deliveryOption.id}">
        <input type="radio"
               ${isCheked? 'checked':''}
               class="delivery-option-input"
               name="delivery-option-${matchingProduct.id}">
            <div>
                <div class="delivery-option-date">
                    ${dateString}
                </div>
                <div class="delivery-option-price">
                    ${priceString} - Shipping
                </div>
            </div>
    </div>`
});

return html;
}

document.querySelector('.js-order-summary').innerHTML=cartSummaryHTML;

document.querySelectorAll('.js-delete-quantity-link')
    .forEach((link)=>{
        link.addEventListener('click', ()=>{
            const productId=link.dataset.productId;
            removeFromCart(productId);

            const conteiner=document.querySelector(`.js-cart-item-container-${productId}`);
            conteiner.remove();
        });
    });

document.querySelectorAll('.js-delivery-option')
    .forEach((element)=>{
        element.addEventListener('click',()=>{
            const {productId,deliveryOptionId}=element.dataset;
            updateDeliverOption(productId,deliveryOptionId);
        });
    });