/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
function prepareDataForRequest(options) {
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
        // let FormData = require('form-data');  // заглушка для node.js
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


function createRequest(options) {
    const dataForRequest = prepareDataForRequest(options);
    // var XMLHttpRequest = require('xhr2');  // заглушка для node.js
    const xhr = new XMLHttpRequest;

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status != 200) {
                return options.callback(xhr.response);
            }
            else {
                return options.callback(null, xhr.response);
            }
        }
    }

    xhr.open(`${options.method}`, dataForRequest.requestUrl);
    xhr.responseType = 'json';
    xhr.withCredentials = true;
    xhr.send(dataForRequest.formData);
};



// здесь перечислены все возможные параметры для функции
// createRequest({
//     url: '/user/current', // адрес https://example.com
//     data: { // произвольные данные, могут отсутствовать
//         email: 'ivan@poselok.ru',
//         password: 'odinodin'
//     },
//     method: 'GET', // метод запроса
//     /*
//         Функция, которая сработает после запроса.
//         Если в процессе запроса произойдёт ошибка, её объект
//         должен быть в параметре err.
//         Если в запросе есть данные, они должны быть переданы в response.
//     */
//     callback: (err, response) => {
//         console.log( 'Ошибка =>', err );
//         console.log( 'Данные =>', response );
//     }
// });