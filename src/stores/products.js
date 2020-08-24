import {observable, computed, action} from 'mobx';


export default class {
    constructor(rootStore) {
        this.rootStore = rootStore;
        this.api = this.rootStore.api.products;
    }
    
    @observable items = [];

    @computed get productsMap() {
        let map = {};

        this.items.forEach((pr, i) => {
            map[pr.id.toString()] = i;
        })

        return map;
    }

    @action load() {
        return new Promise((resolve, reject) => {
            this.api.all().then((data) => {
                this.items = data;
                resolve(true);
            });
        })
    }

    getById(id) {
        let index = this.productsMap[id];

        if(index === undefined) {
            return null
        }
        
        return this.items[index];
        
    }
}