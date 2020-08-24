import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import { Form, Button, Modal } from 'react-bootstrap';

import {Link} from 'react-router-dom';
import {routesMap} from '~/routes';

@inject('stores') @observer class Order extends React.Component{
    confirm = () => {
        this.props.stores.order.hide();
        this.props.history.push(routesMap.result);
        this.props.stores.order.addOrderCache(this.props.stores.cart.total);
        this.props.stores.cart.clean();
    }

    render() {
        let order = this.props.stores.order;
        let formFields = [];

        for(let name in order.formData) {
            let field = order.formData[name];
            formFields.push(
                <Form.Group key={name} controlId={`order-form-${name}`}>
                    <Form.Label>{field.label}</Form.Label>
                    <Form.Control type={field.type} value={field.value} onChange={(e) => {order.changeFormData(name, e.target.value)}}/>
                    {field.valid === null || field.valid ? '' : 
                        <Form.Text className="text-muted">
                            {field.errorText}
                        </Form.Text>
                    }
                </Form.Group>
            );
        }
        return (
            <div>
                <h2>Order</h2>
                <hr/>
                <Form>
                    {formFields}
                    <Link className="btn btn-warning" to={routesMap.cart}>
                        Back to cart
                    </Link>
                    &nbsp;&nbsp;
                    <Button variant="primary" onClick={order.show} disabled={!order.formValid}>
                        Aply order
                    </Button>
                </Form>
                <Modal show={order.showModal} backdrop="static">
                    <Modal.Header>
                        <Modal.Title>Check information</Modal.Title>
                        </Modal.Header>
                    <Modal.Body>
                        Content
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={order.hide}>
                            Ooops
                        </Button>
                        <Button variant="primary" onClick={this.confirm}>
                            All right
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default Order;