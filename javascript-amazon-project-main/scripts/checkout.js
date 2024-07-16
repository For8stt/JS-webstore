import {renderOrderSummary} from "./checkout/orderSummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummary.js";
import {loadProduct,loadFromFetch} from "../data/products.js";
import {loadCart} from "../data/cart.js";

async function loadPage(){
    await loadFromFetch();
    await new Promise((resolve)=>{
        loadCart(()=>{
            resolve();
        });
    });
    renderOrderSummary();
    renderPaymentSummary();

}
loadPage();

/*
Promise.all([
    loadFromFetch(),
    new Promise((resolve)=>{
        loadCart(()=>{
            resolve();
        });
    })
]).then(()=>{
    renderOrderSummary();
    renderPaymentSummary();
});
*/

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


