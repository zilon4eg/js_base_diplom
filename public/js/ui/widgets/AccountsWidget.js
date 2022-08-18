/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */

class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (!element) {
      throw new Error('Передан пустой элемент!');
    } else {
      this.element = element;
      this.registerEvents();
      this.update()
    }
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    const createAccount = document.querySelectorAll('.create-account');
    createAccount.forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();

        const modalNewAccount = document.querySelector('#modal-new-account');
        const modalWindow = new Modal(modalNewAccount);
        modalWindow.open(modalNewAccount);
      });      
    });

    const accounts = document.querySelectorAll('.account');
    accounts.forEach(el => {
      this.onSelectAccount(el);
    });
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    if (User.current()) {
      const data = User.fetch();
      const response = Account.list(data, (err, response) => {});
      if (response && response.success === true) {
        this.clear();
        this.renderItem(response);
      }
    }
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    const accounts = document.querySelectorAll('.account');
    accounts.forEach(el => {
      el.remove();
    });
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount(element) {
    element.addEventListener('click', (e) => {
      e.preventDefault();

      const accounts = document.querySelectorAll('.account');
      accounts.forEach(el => {
        if (el.className.includes(active)) {
          el.classList.remove('active');
        }
      });

      el.classList.add('active');
      App.showPage('transactions', {account_id: el.dataset.id});
    });
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item){
    // const countForm = `<li class="account" data-id="${item.id}"><a href="#"><span>${item.name}</span><span>${item.sum} ₽</span></a></li>`
    
    const countName = document.createElement('span');
    countName.textContent = item.name;
    const countSum = document.createElement('span');
    countSum.textContent = `${item.sum} ₽`;
    const countLink = document.createElement('a');
    countLink.href = '#';
    countLink.appendChild(countName);
    countLink.appendChild(countSum);
    const countForm = document.createElement('li');
    countForm.className = 'account';
    countForm.dataset.id = item.id;
    countForm.appendChild(countLink);
    return countForm;
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data){
    console.log(data);
    this.element = this.getAccountHTML(data);
  }
}
