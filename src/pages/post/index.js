import React from 'react';

export default function(props) {
    return (
        <div>
            Post #{props.match.params.url}
        </div>
    )
}