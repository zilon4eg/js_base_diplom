/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
    /**
     * Получает информацию о счёте
     * */
    static URL = '/account';

    static get(id = '', callback){
        const dataForRequest = {
            url: `${this.URL}/${id}`,
            data: data,
            method: 'GET',
            callback: callback,
        }

        createRequest(dataForRequest, callback);
    }
}
