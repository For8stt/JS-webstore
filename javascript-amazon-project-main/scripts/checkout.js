import {renderOrderSummary} from "./checkout/orderSummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummary.js";
import {loadProduct} from "../data/products.js";
import {loadCart} from "../data/cart.js";
// import '../data/cart-class.js';
// import '../data/backend-practice.js'

Promise.all([
    new Promise((resolve)=>{
        loadProduct(()=>{
            resolve();
        });
    }),
    new Promise((resolve)=>{
        loadCart(()=>{
            resolve();
        });
    })
]).then(()=>{
    renderOrderSummary();
    renderPaymentSummary();
});


// new Promise((resolve)=>{
//     loadProduct(()=>{
//         resolve();
//     });
// }).then(()=>{
//     return new Promise((resolve)=>{
//         loadCart(()=>{
//             resolve();
//         });
//     })
// }).then(()=>{
//     renderOrderSummary();
//     renderPaymentSummary();
// });


