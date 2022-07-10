/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    sidebarToggle.addEventListener('click', (e) => {
      e.preventDefault();
      const body = document.getElementsByTagName('body')[0];
      
      if ((body.className.includes('sidebar-open')) && (body.className.includes('sidebar-collapse'))) {
        body.classList.remove('sidebar-open');
        body.classList.remove('sidebar-collapse');
      }
      else {
        body.classList.add('sidebar-open');
        body.classList.add('sidebar-collapse');
      }
    });
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регистрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const registerForm = document.getElementById('modal-register')[0];
    const registerBtn = registerForm.querySelector('.btn-primary');
    registerBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const window = App.getModal('#modal-register');
      Modal.open(window);
    });

    const loginForm = document.getElementById('modal-login')[0];
    const enterBtn = loginForm.querySelector('.btn-primary');
    enterBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const window = App.getModal('#modal-login');
      Modal.open(window);
    });

    const logoutBtn = document.querySelector('.menu-item_logout');
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const response = User.logout();
      if (response.success) {
        App.setState('init');
      }
    });
  }
}