/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    const response = User.register(data);
    if (response && response.success === true) {
      this.element.reset();
      App.setState('user-logged');
      Modal.close(this.element);
    }
  }
}