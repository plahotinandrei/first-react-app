import React from 'react';
import AppMinMax from '~c/inputs/minmax';
import {Link} from 'react-router-dom';
import {routesMap} from '~/routes';
import withStore from '~/hocs/withStore.js';
import LinkButton from '~c/links/button';

class Cart extends React.Component{
    render() {
        let cartModel = this.props.stores.cart;

        let productsRows = cartModel.productsDetailed.map((product, i) => {
            return (
                <tr key={product.id}>
                    <td>{product.title}</td>
                    <td>{product.price}</td>
                    <td>
                        <AppMinMax min={1} 
                                   max={product.rest} 
                                   cnt={product.cnt} 
                                   onChange={(cnt) => {cartModel.change(product.id, cnt)}}
                        />
                    </td>
                    <td>{product.price * product.cnt}</td>
                    <td>
                        <button onClick={() => cartModel.remove(product.id)}>
                            X
                        </button>
                    </td>
                </tr>
            );
        });

        return (
            <div>
                <h2>Cart</h2>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <td>Title</td>
                            <td>Price</td>
                            <td>Count</td>
                            <td>Total</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {productsRows}
                    </tbody> 
                </table>
                <h3>Total: {cartModel.total}</h3>
                <hr/>
                <LinkButton className="btn btn-primary" to={routesMap.order}>Send</LinkButton>
            </div>
        );
    }
}

export default withStore(Cart);