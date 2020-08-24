let mainServerUrl ='http://webdev-pro.ru/';

export default function makeRequest(url, options = {}, baseUrl = mainServerUrl) {
    return fetch(baseUrl + url, options).then((response) => {
            if(response.status !== 200) {
                return response.json().then((text) => {
                    throw new Error(text);
                })
            }

            return response.json();
    });
}