import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'mobx-react';
import App from './app';
import 'bootstrap/dist/css/bootstrap.min.css';
import stores from '~s';

stores.products.load().then(() => {
    ReactDom.render(
        <Provider stores={stores}>
            <App/>
        </Provider>,
        document.querySelector('#app')
    );
});

stores.cart.load();

