/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон
 * */
class Modal {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью Modal.registerEvents()
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element){

  }

  /**
   * При нажатии на элемент с data-dismiss="modal"
   * должен закрыть текущее окно
   * (с помощью метода Modal.onClose)
   * */
  registerEvents() {

  }

  /**
   * Срабатывает после нажатия на элементы, закрывающие окно.
   * Закрывает текущее окно (Modal.close())
   * */
  onClose(e) {

  }
  /**
   * Открывает окно: устанавливает CSS-свойство display
   * со значением «block»
   * */
  open() {

  }
  /**
   * Закрывает окно: удаляет CSS-свойство display
   * */
  close(){

  }
}

const test = document.querySelectorAll('button[data-dismiss="modal"]')

console.log(test[0].className);
test.forEach(element => {
  element.style.display = 'block';
});