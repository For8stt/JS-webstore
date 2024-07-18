import {renderOrderSummary} from "./checkout/orderSummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummary.js";
import {loadFromFetch} from "../data/products.js";
import {loadCart,loadCartFetch} from "../data/cart.js";

async function loadPage(){
    try {
        // throw 'error1';

        await Promise.all([
            loadFromFetch(),
            loadCartFetch()
        ]);

        // await new Promise((resolve,reject)=>{
        //  // throw 'error2';
        //     loadCart(()=>{
        //         // reject('error3')
        //         resolve();
        //     });
        // });

    }catch(error){
        console. log( 'Unexpected error. Please try again later.');
    }

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


