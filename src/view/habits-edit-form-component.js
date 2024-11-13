import { createElement } from '../framework/render.js';

function createHabitsEditFormComponentTemplate(habit) {
  return (
    `<div class="habit-edit-form">
      <h2>Редактировать Привычку</h2>
      <form id="habit-edit-form">
        <label for="edit-habit-name">Название привычки:</label>
        <input type="text" id="edit-habit-name" value="${habit.title}" required />

        <label for="edit-habit-description">Описание:</label>
        <textarea id="edit-habit-description" rows="3">${habit.description || ''}</textarea>

        <label for="edit-habit-status">Статус привычки:</label>
        <select id="edit-habit-status" required>
          <option value="active" ${habit.status === 'active' ? 'selected' : ''}>Активна</option>
          <option value="completed" ${habit.status === 'completed' ? 'selected' : ''}>Завершена</option>
        </select>

        <button type="submit">Сохранить изменения</button>
        <button type="button" id="cancel-edit">Отмена</button>
      </form>
    </div>`
  );
}

export default class HabitsEditFormComponent {
  constructor(habit) {
    this.habit = habit;
    this.element = null;
  }

  getTemplate() {
    return createHabitsEditFormComponentTemplate(this.habit);
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
    this.getElement().querySelector('#habit-edit-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const title = this.getElement().querySelector('#edit-habit-name').value;
      const description = this.getElement().querySelector('#edit-habit-description').value;
      const status = this.getElement().querySelector('#edit-habit-status').value;
      callback({ title, description, status });
    });
  }

  setCancelEditHandler(callback) {
    this.getElement().querySelector('#cancel-edit').addEventListener('click', callback);
  }
}
