import cartStore from './cart.js';
import productsStore from './products.js';
import orderStore from './order.js';
import * as products from '~/api/products.js';
import * as cart from '~/api/cart.js';
 
class RootStore {
    constructor() {
        this.api = {
            products,
            cart
        }

        this.storage = localStorage;

        this.cart = new cartStore(this);
        this.products = new productsStore(this);
        this.order = new orderStore(this);
    }
}

export default new RootStore();