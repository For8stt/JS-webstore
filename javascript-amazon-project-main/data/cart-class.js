class Cart{
    cartItems;
    #localStorageKey;

    constructor(localStorage) {
        this.#localStorageKey=localStorage;
        this.#loadFromStarage();
    }

    #loadFromStarage(){
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey))||[];
    }

    saveToStorage(){
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }
    addToCart(productId){
        let matchingItem;

        this.cartItems.forEach((cartItem)=>{
            if(productId===cartItem.productId){
                matchingItem=cartItem;
            }
        });

        if (matchingItem){
            matchingItem.quantity+=1;
        }else {
            this.cartItems.push({
                productId: productId,
                quantity: 1,
                deliveryOptionId: '1'
            });
        }

        this.saveToStorage();
    }

    removeFromCart(productId){
        const newCart=[];
        this.cartItems.forEach((cartItem)=>{
            if (cartItem.productId !== productId){
                newCart.push(cartItem);
            }
        });
        this.cartItems=newCart;

        this.saveToStorage();
    }

    updateDeliverOption(productId, deliverOptionId){
        let matchingItem;
        this.cartItems.forEach((item)=>{
            if(productId===item.productId){
                matchingItem=item;
            }
        });

        matchingItem.deliveryOptionId=deliverOptionId;
        this.saveToStorage();
    }

}


const cart=new Cart('cart-oop');



cart.addToCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
console.log(cart);