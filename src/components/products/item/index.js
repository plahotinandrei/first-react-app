import React from 'react';
import {Link} from 'react-router-dom';

export default function(props) {
    return (
        <div>
            <h3>{props.title}</h3>
            <hr/>
            <div>
            <strong>Price: {props.price}</strong>
            </div>
            <Link to={props.backUrl}>back to list</Link>
            <hr/>
            {props.btn}
        </div>
    )
}