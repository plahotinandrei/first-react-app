import React from 'react';

import {Link} from 'react-router-dom';
import {urlBuilder} from '~/routes';
import {inject} from 'mobx-react';

@inject('stores') export default class extends React.Component{
    render() {
        let cartModel = this.props.stores.cart;
        let orderModel = this.props.stores.order;

        return (
            <div>
                <h2>Congratulations!!!</h2>
                <p>Hello, {orderModel.data.name}!</p>
                <p>Total: {orderModel.lastOrderCache}</p>
            </div>
        )
    }
}