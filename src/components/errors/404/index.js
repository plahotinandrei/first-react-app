import React from 'react';
import { Link } from 'react-router-dom';
import {routesMap} from '~/routes';

export default function() {
    return (
        <>
            <h1>Error 404, page not found</h1>
            <hr/>
            <div className="alert alert-warning">
                <p>
                    Go to <Link to={routesMap.home}>home page</Link>
                </p>
            </div>
        </>
    )
}