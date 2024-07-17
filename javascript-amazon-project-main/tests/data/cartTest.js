import {
    addToCart,
    cart,
    loadFromStarage,
    removeFromCart,
    updateDeliverOption
} from "../../data/cart.js";


describe('test-simple suite: addToCart',()=>{
    beforeEach(()=>{
        spyOn(localStorage,'setItem');
    });
    it('adds an existing product to the cart', () => {
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([
                {
                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity: 1,
                    deliveryOptionId: '1'
                }
            ]);
        });
        loadFromStarage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(2);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart','[{"productId":"e43638ce-6aa0-4b85-b27f-e1d07eb678c6","quantity":2,"deliveryOptionId":"1"}]');
    });

    it('adds a new product to the cart', () => {
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([]);
        });
        loadFromStarage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart','[{"productId":"e43638ce-6aa0-4b85-b27f-e1d07eb678c6","quantity":1,"deliveryOptionId":"1"}]')
    });
});
describe('test suite: removeFromCart',()=>{
    beforeEach(()=>{
       spyOn(localStorage,'setItem');
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            }])
        });
        loadFromStarage();
    });

    it('removes a product from the cart',()=>{

        removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

        expect(cart.length).toEqual(0);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart','[]');
    });
    it('does nothing if product is not in the cart',()=>{
       removeFromCart('does-not-exist');

       expect(cart.length).toEqual(1);
       expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
           productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
           quantity: 1,
           deliveryOptionId: '1'
       }]))
       expect(localStorage.setItem).toHaveBeenCalledTimes(1);
       expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
       expect(cart[0].quantity).toEqual(1);
    });
});
describe('test suite: updateDeliveryOption',()=>{
    beforeEach(()=>{
        spyOn(localStorage,'setItem');
    })
    it('updates the delivery option', () => {
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([
                {
                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity: 1,
                    deliveryOptionId: '1'
                }
            ]);
        });

        loadFromStarage();
        updateDeliverOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6','3');

        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual( 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
        expect(cart[0].deliveryOptionId).toEqual('3')
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([
            {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '3'
            }
        ]))

    });
    it('does nothing if the product is not in the cart', () => {
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([
                {
                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity: 1,
                    deliveryOptionId: '1'
                }
            ]);
        });

        loadFromStarage();
        updateDeliverOption('does-not-exist','3');

        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual( 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
        expect(cart[0].deliveryOptionId).toEqual('1')
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    });

    it('does nothing if the delivery option does not exist', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        });
        loadFromStarage();

        updateDeliverOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 'does-not-exist');
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
        expect(cart[0].deliveryOptionId).toEqual('1');
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    });
});

