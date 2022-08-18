/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
function prepareDataForRequest(options) {
    let reqUrl = options.url;
    if (options.method === 'GET') {
        let reqParam = '';
        if (Object.keys(options).includes('data')) {  // если ключ 'data' есть в объекте
            if (options.data != undefined) {
                for (key of Object.keys(options.data)) {
                    reqParam += `&${key}=${options.data[key]}`;
                }
            }
            else {
                return {requestUrl: reqUrl};
            }
        }
        return {requestUrl: `${reqUrl}?${reqParam.substring(1)}`};
    }
    else {
        const reqUrl = options.url;
        const formData = new FormData();
        for (key of Object.keys(options.data)) {
            formData.append(key, `${options.data[`${key}`]}`);
        }
        return {
            requestUrl: reqUrl,
            formData: formData,
        };
    }
}


function createRequest(options) {
    const dataForRequest = prepareDataForRequest(options);
    const xhr = new XMLHttpRequest;

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status != 200) {
                return options.callback(xhr.response);
            }
            else {
                // console.log(xhr.response);
                // console.log(options.callback);
                return options.callback(null, xhr.response);
            }
        }
    }

    xhr.open(options.method, dataForRequest.requestUrl);
    xhr.responseType = 'json';
    xhr.withCredentials = true;
    if (Object.keys(dataForRequest).includes('formData')) {
        xhr.send(dataForRequest.formData);
    }
    else {
        xhr.send();
    }
};



// здесь перечислены все возможные параметры для функции
// createRequest({
//     url: '/user/current', // адрес https://example.com  (или /user/current)
//     data: { // произвольные данные, могут отсутствовать
//         email: 'ivan@poselok.ru',
//         password: 'odinodin',
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