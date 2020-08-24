import React from 'react';
import style from './app.module.css';
import {BrowserRouter as Router, Route, Switch, NavLink} from 'react-router-dom';
import {ListGroup} from 'react-bootstrap';

import routes, {routesMap} from '~/routes';
import withStore from '~/hocs/withStore.js';

class App extends React.Component{
    
    render(){
        let routesComponents = routes.map((route) => {
            return (
                <Route 
                    key={route.url}
                    path={route.url} 
                    component={route.component} 
                    exact={route.exact}
                />
            ) 
        })
        return (
            <Router>
                <div className="container">
                    <header>
                        In cart:&nbsp;
                        <strong>{this.props.stores.cart.cartCnt}</strong> <br/>
                        Total:&nbsp;
                        <strong>{this.props.stores.cart.total}</strong>
                    </header>
                    <hr/>
                    <div className="row">
                        <div className="col col-3">
                        <ListGroup>
                            <ListGroup.Item>
                                <NavLink to={routesMap.home} activeClassName={style.active} exact>
                                    Home
                                </NavLink>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <NavLink to={routesMap.cart} activeClassName={style.active} exact>
                                    Cart
                                </NavLink>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <NavLink to={routesMap.order} activeClassName={style.active} exact>
                                    Order
                                </NavLink>
                            </ListGroup.Item>
                        </ListGroup>
                        </div>
                        <div className="col col-9">
                            <Switch>
                                {routesComponents}
                            </Switch> 
                        </div>
                    </div>
                    
                </div>
            </Router>   
        )
    }
}

export default withStore(App);