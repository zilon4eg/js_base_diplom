/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const data = User.fetch();
    const countsList = Account.list(data, (err, response) => {});
    this.element.reset();
    if (countsList) {
      countsList.forEach(el => {
        const count = document.createElement('option');
        count.value = el.id;
        count.textContent = el.name;
        this.element.append(count);
      });
    }
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    const response = Transaction.create(data);
    if (response && response.success === true) {
      App.update();
      this.element.reset();
      Modal.close(this.element);
    }
  }
}