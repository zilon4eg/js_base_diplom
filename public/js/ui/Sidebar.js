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
    const menuItemRegister = document.querySelector('.menu-item_register');
    menuItemRegister.addEventListener('click', (e) => {
      e.preventDefault();
      const window = App.getModal('register');
      const modalWindow = new Modal(window.element);
      modalWindow.open(window.element);
    });

    const menuItemLogin = document.querySelector('.menu-item_login');
    menuItemLogin.addEventListener('click', (e) => {
      e.preventDefault();
      const window = App.getModal('login');
      const modalWindow = new Modal(window.element);
      modalWindow.open(window.element);
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