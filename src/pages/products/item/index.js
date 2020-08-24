import React from 'react';
import {Link} from 'react-router-dom';
import {routesMap} from '~/routes';
import {observer, inject} from 'mobx-react';
import E404 from '~p/error404';
import ProductItem from '~c/products/item';

@inject('stores') @observer class Product extends React.Component {
    render() {
        let productModel = this.props.stores.products;
        let cartModel = this.props.stores.cart;

        let product = productModel.getById(this.props.match.params.id);

        if(product === null) {
            return (
                <E404/>
            )
        }else {
            let btn;

            if(cartModel.inCart(product.id)) {
                btn = (
                    <button className="btn btn-danger" onClick={() => {cartModel.remove(product.id)}}>
                        Remove from cart
                    </button>
                )
            }else {
                btn = (
                    <button className="btn btn-success" onClick={() => {cartModel.add(product.id)}}>
                        Add to cart
                    </button>
                )
            }

            return (
                <ProductItem
                    title={product.title}
                    price={product.price}
                    backUrl={routesMap.home}
                    btn={btn}
                />
            )
        }
    }  
}

export default Product;