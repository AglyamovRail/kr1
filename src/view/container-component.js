import {createElement} from '../framework/render.js';


function createContainerComponentTemplate() {
    return (
        `<div class="container">
            <h1>Ежедневный Трекер Привычек</h1>
            <details>
                <summary>Как использовать</summary>
                <p>Добавляйте привычки, следите за их выполнением и обновляйте статус. Вы можете добавлять описание к привычкам и отслеживать их по статусу.</p>
            </details>
        </div>`
      );
}


export default class ContainerComponent {
  getTemplate() {
    return createContainerComponentTemplate();
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
}
