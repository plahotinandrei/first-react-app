import {observable, computed, action} from 'mobx';

export default class {
    constructor(rootStore) {
        this.rootStore = rootStore;
        this.api = this.rootStore.api.cart;
        this.storage = this.rootStore.storage;
        this.token = this.storage.getItem('cartToken');
    }

    @observable products = [];

    @computed get productsDetailed() {
        return this.products.map((pr) => {
            let product = this.rootStore.products.getById(pr.id);
            return {...product, cnt: pr.cnt};
        })
    }

    @computed get inCart() {
        return (id) => this.products.some((product) => product.id === id);
    }

    @computed get cartCnt() {
        return this.products.length;
    }

    @computed get total() {
        return this.productsDetailed.reduce((t, pr) => {
            return t + (pr.cnt * pr.price);
        }, 0)
    }

    @action load() {
        this.api.load(this.token).then((data) => {
            this.products = data.cart;
            console.log(data);
            if(data.needUpdate) {
                this.token = data.token;
                this.storage.setItem('cartToken', this.token);
            };
        });
    }

    @action add(id) {
        this.api.add(this.token, id).then((res) => {
            if(res) {
                this.products.push({id, cnt: 1});
            }
        });   
    }

    @action change(id, cnt) {
        let index = this.products.findIndex((pr) => {
            return pr.id === id;
        });

        if(index !== -1) {
            this.api.change(this.token, id, cnt).then((res) => {
                if(res) {    
                    this.products[index].cnt = cnt;   
                }
            });   
        } 
    }

    @action remove(id) {
        let index = this.products.findIndex((pr) => {
            return pr.id === id;
        });

        if(index !== -1) {
            this.api.remove(this.token, id).then((res) => {
                if(res) {    
                    this.products.splice(index, 1);    
                }
            }); 
        }         
    }

    @action clean() {
        this.api.clean(this.token).then((res) => {
            if(res) {    
                this.products = []; 
            }
        }); 
    }
}