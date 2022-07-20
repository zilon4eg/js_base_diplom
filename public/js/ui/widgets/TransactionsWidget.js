/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
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
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    const incomeForm = document.getElementById('modal-new-income');
    const incomeSumbitBtn = incomeForm.querySelector('btn-primary');
    incomeSumbitBtn.addEventListener('click', (e) => {
      Modal.open(this.element);
    });

    const expenseForm = document.getElementById('modal-new-expense');
    const expenseSumbitBtn = expenseForm.querySelector('btn-primary');
    expenseSumbitBtn.addEventListener('click', (e) => {
      Modal.open(this.element);
    });
  }
}
