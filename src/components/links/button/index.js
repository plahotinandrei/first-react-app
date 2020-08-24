import React from 'react';
import {withRouter} from 'react-router-dom';

function LinkButton(props) {
    const {
        history,
        location,
        match,
        staticContext,
        to,
        ...other
    } = props;

    return <button {...other} onClick={() => {history.push(to)}}/>
}

export default withRouter(LinkButton);

