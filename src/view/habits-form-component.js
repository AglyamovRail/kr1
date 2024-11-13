import {createElement} from '../framework/render.js';

function createHabitsFormComponentTemplate() {
  return (
    `<div class="habit-form">
      <h2>Добавить Привычку</h2>
      <form id="habit-form">
        <label for="habit-name">Название привычки:</label>
        <input type="text" id="habit-name" placeholder="Например, Утренняя зарядка" required />
        
        <label for="habit-description">Описание:</label>
        <textarea id="habit-description" placeholder="Описание привычки" rows="3"></textarea>

        <label for="habit-status">Статус привычки:</label>
        <select id="habit-status" required>
          <option value="active">Активна</option>
          <option value="completed">Завершена</option>
        </select>

        <button type="submit">Добавить Привычку</button>
      </form>
    </div>`
  );
}

export default class HabitsFormComponent {
  constructor() {
    this.element = null;
  }

  getTemplate() {
    return createHabitsFormComponentTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }

  setFormSubmitHandler(callback) {
    this.getElement().querySelector('#habit-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const habitName = this.getElement().querySelector('#habit-name').value;
      const habitDescription = this.getElement().querySelector('#habit-description').value;
      const habitStatus = this.getElement().querySelector('#habit-status').value;
      callback({
        id: Date.now(), 
        title: habitName,
        description: habitDescription,
        status: habitStatus
      });
    
      this.getElement().querySelector('#habit-name').value = '';
      this.getElement().querySelector('#habit-description').value = '';
      this.getElement().querySelector('#habit-status').value = 'active';
    });
  }
}
