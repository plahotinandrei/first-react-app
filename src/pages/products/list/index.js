import React from 'react';
import style from './list.module.css';
import {Card, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {urlBuilder} from '~/routes';
import {observer, inject} from 'mobx-react';

@inject('stores') @observer class Products extends React.Component {
    
    render() {
        let cartModel = this.props.stores.cart;
        let productModel = this.props.stores.products;

        let productsCards = productModel.items.map((pr) => {
            let btn;
            if(cartModel.inCart(pr.id)) {
                btn = (
                    <Button variant="danger" onClick={() => {cartModel.remove(pr.id)}}>
                        Remove from cart
                    </Button>
                );
            }else {
                btn = (
                    <Button variant="success" onClick={() => {cartModel.add(pr.id)}}>
                        Add to cart
                    </Button>
                );
            }
            return (
                <div className={`col-4 ${style.mb30}`} key={pr.id}>
                    <Card>
                        <Card.Body>
                            <Card.Title>{pr.title}</Card.Title>
                            <Card.Text>
                                <strong>Price: {pr.price}</strong>
                            </Card.Text>
                            <Link to={urlBuilder('product', {id: pr.id})}>
                                Get more...
                            </Link>
                            <hr/>
                            {btn}
                        </Card.Body>                       
                    </Card>
                </div>
            )
        });
        return (
            <React.Fragment>
                <h2>Products</h2>
                <div className="row">
                    {productsCards}
                </div>
            </React.Fragment>  
        )
    }  
}

export default Products;