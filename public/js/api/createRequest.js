/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
function dataForRequest(options) {
    let requestUrl = `${options.url}?`;
    if (options.method === 'GET') {
        for (key of Object.keys(options.data)) {
            if (key === 'email') {
                requestUrl += '&mail=';
            }
            else if (key === 'password') {
                requestUrl += '&password=';
            }
            requestUrl += `${options.data[`${key}`]}`
        }
        return {
            'requestUrl': requestUrl.replace('?&', '?'),
            'formData': null,
        };
    }
    else {
        const requestUrl = `${options.url}`;
        let FormData = require('form-data');  // заглушка для node.js
        const formData = new FormData();
        for (key of Object.keys(options.data)) {
            formData.append(key, `${options.data[`${key}`]}`);
        }
        return {
            'requestUrl': requestUrl,
            'formData': formData,
        };
    }
}


const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest;
    xhr.open(`${options.method}`, dataForRequest(options).requestUrl);
    xhr.send(dataForRequest(options).formData);
};




const options = {
    url: 'https://example.com',
    data: {
      mail: 'ivan@biz.pro',
      password: 'odinodin'
    },
    method: 'GET',
  };

console.log(dataForRequest(options));
