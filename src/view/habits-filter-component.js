import {createElement} from '../framework/render.js';

function createHabitsFilterComponentTemplate() {
  return (
    `<div class="habit-filter">
      <h2>Фильтры</h2>
      <label for="status-filter">Фильтр по статусу:</label>
      <select id="status-filter">
        <option value="all">Все</option>
        <option value="active">Активные</option>
        <option value="completed">Завершенные</option>
      </select>
    </div>`
  );
}

export default class HabitsFilterComponent {
  constructor() {
    this.element = null;
  }

  getTemplate() {
    return createHabitsFilterComponentTemplate();
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

  setFilterChangeHandler(callback) {
    this.getElement().querySelector('#status-filter').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }
}
