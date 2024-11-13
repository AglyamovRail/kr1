import {createElement} from '../framework/render.js';

function translateStatusToRussian(status) {
  return status === 'active' ? 'Активна' : 'Завершена';
}

function createHabitsListComponentTemplate(habits) {
  return (
    `<div class="habit-list">
      <h2>Список Привычек</h2>
      <div id="habit-list">
        ${habits.map(habit => `
          <div class="habit-item" data-id="${habit.id}">
            <div class="title">${habit.title}</div>
            <div class="status">${translateStatusToRussian(habit.status)}</div>
            <button class="edit-button">Редактировать</button>
            <button class="delete-button">Удалить</button>
          </div>
        `).join('')}
      </div>
    </div>`
  );
}

export default class HabitsListComponent {
  constructor({habits}) {
    this.habits = habits;
    this.element = null;
  }

  getTemplate() {
    return createHabitsListComponentTemplate(this.habits);
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

  setDeleteButtonClickHandler(callback) {
    this.getElement().querySelectorAll('.delete-button').forEach(button => {
      button.addEventListener('click', (event) => {
        const habitId = event.target.closest('.habit-item').dataset.id;
        callback(habitId);
      });
    });
  }

  setEditButtonClickHandler(callback) {
    this.getElement().querySelectorAll('.edit-button').forEach(button => {
      button.addEventListener('click', (event) => {
        const habitId = event.target.closest('.habit-item').dataset.id;
        callback(habitId);
      });
    });
  }

  updateHabits(habits) {
    this.habits = habits;
    this.element.innerHTML = this.getTemplate();
    this.setDeleteButtonClickHandler(this._deleteButtonHandler);
    this.setEditButtonClickHandler(this._editButtonHandler);
  }

  setDeleteButtonHandler(callback) {
    this._deleteButtonHandler = callback;
    this.setDeleteButtonClickHandler(callback);
  }

  setEditButtonHandler(callback) {
    this._editButtonHandler = callback;
    this.setEditButtonClickHandler(callback);
  }
}
