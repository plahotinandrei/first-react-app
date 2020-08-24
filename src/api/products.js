import makeRequest from './helpers/makeRequest.js';

function all() {
    return makeRequest('products/all.php');
}

export { all };