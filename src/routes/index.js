import Cart from '~p/cart';
import Order from '~p/order';
import Result from '~p/result';
import E404 from '~p/error404';
import ProductList from '~p/products/list';
import ProductItem from '~p/products/item';

let routes = [
    {
        name: 'home',
        url: '/',
        component: ProductList,
        exact: true
    },
    {
        name: 'product',
        url: '/product/:id',
        component: ProductItem,
        exact: true
    },
    {
        name: 'cart',
        url: '/cart',
        component: Cart,
        exact: true
    },
    {
        name: 'order',
        url: '/order',
        component: Order,
        exact: true
    },
    {
        name: 'result',
        url: '/done',
        component: Result,
        exact: true
    },
    {
        url: '**',
        component: E404
    }
]

let routesMap = {};

routes.forEach((route) => {
    if(route.hasOwnProperty('name')) {
        routesMap[route.name] = route.url;
    }
});

let urlBuilder = function(name, params) {
    if(!routesMap.hasOwnProperty(name)) {
        return null;
    }

    let url = routesMap[name];

    for(let key in params) {
        url = url.replace(':' + key, params[key])
    }

    return url;
}

export default routes;
export {routesMap};
export {urlBuilder};