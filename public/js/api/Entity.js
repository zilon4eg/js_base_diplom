/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
    /**
     * Запрашивает с сервера список данных.
     * Это могут быть счета или доходы/расходы
     * (в зависимости от того, что наследуется от Entity)
     * */
    static URL = '';

    static list(data, callback){
        const dataForRequest = {
            url: `${this.URL}`,
            data: data,
            method: 'GET',
            callback: callback,
        }

        createRequest(dataForRequest, callback);
    }

    /**
     * Создаёт счёт или доход/расход с помощью запроса
     * на сервер. (в зависимости от того,
     * что наследуется от Entity)
     * */
    static create(data, callback) {
        const dataForRequest = {
            url: `${this.URL}`,
            data: data,
            method: 'PUT',
            callback: callback,
        }

        createRequest(dataForRequest);
    }

    /**
     * Удаляет информацию о счёте или доходе/расходе
     * (в зависимости от того, что наследуется от Entity)
     * */
    static remove(data, callback ) {
        const dataForRequest = {
            url: `${this.URL}`,
            data: data,
            method: 'DELETE',
            callback: callback,
        }

        createRequest(dataForRequest, callback);
    }
}

// Entity.list({
//     email: 'ivan@poselok.ru',
//     password: 'odinodin'
// },
// function(err, response) {
//     console.log( 'Ошибка =>', err );
//     console.log( 'Данные =>', response );
// });