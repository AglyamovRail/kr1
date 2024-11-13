import HabitsListComponent from '../view/habits-list-component.js';
import HabitsFilterComponent from '../view/habits-filter-component.js';
import HabitsFormComponent from '../view/habits-form-component.js';
import HabitsEditFormComponent from '../view/habits-edit-form-component.js';
import { render, RenderPosition } from '../framework/render.js';
import HabitsModel from '../model/habits-model.js';


function removeElement(component) {
  if (component && component.getElement()) {
    component.getElement().remove();
    component.removeElement();
  }
}

export default class HabitsBoardPresenter {
  constructor({ boardContainer, habitsModel }) {
    this.boardContainer = boardContainer;
    this.habitsModel = habitsModel;
    this.habitsListComponent = new HabitsListComponent({ habits: this.habitsModel.getHabits() });
    this.habitsFormComponent = new HabitsFormComponent();
    this.habitsFilterComponent = new HabitsFilterComponent();
    this.habitsEditFormComponent = null; 
  }

  init() {
    render(this.habitsFormComponent, this.boardContainer);
    render(this.habitsFilterComponent, this.boardContainer);
    render(this.habitsListComponent, this.boardContainer);

    this.setFormToAddMode(); 
    this.habitsFilterComponent.setFilterChangeHandler(this.handleFilterChange.bind(this));
    this.habitsListComponent.setDeleteButtonHandler(this.handleDeleteHabit.bind(this));
    this.habitsListComponent.setEditButtonHandler(this.handleEditHabit.bind(this));
  }

  setFormToAddMode() {
    
    this.habitsFormComponent.setFormSubmitHandler(this.handleFormSubmit.bind(this));
  }

  handleFormSubmit(newHabit) {
    this.habitsModel.addHabit(newHabit);
    this.habitsListComponent.updateHabits(this.habitsModel.getHabits());
    this.habitsFormComponent.getElement().querySelector('#habit-form').reset(); 
  }

  handleFilterChange(status) {
    const filteredHabits = this.habitsModel.getHabits().filter(habit =>
      status === 'all' || habit.status === status
    );
    this.habitsListComponent.updateHabits(filteredHabits);
  }

  handleDeleteHabit(habitId) {
    this.habitsModel.habits = this.habitsModel.habits.filter(habit => String(habit.id) !== String(habitId));
    this.habitsListComponent.updateHabits(this.habitsModel.getHabits());
  }

  handleEditHabit(habitId) {
    const habit = this.habitsModel.getHabits().find(h => String(h.id) === String(habitId));
    if (habit) {
      
      if (this.habitsEditFormComponent) {
        removeElement(this.habitsEditFormComponent); 
        this.habitsEditFormComponent = null;
      }

      
      this.habitsEditFormComponent = new HabitsEditFormComponent(habit);
      render(this.habitsEditFormComponent, this.boardContainer, RenderPosition.BEFOREEND);

      
      this.habitsEditFormComponent.setFormSubmitHandler((updatedHabitData) => {
        
        habit.title = updatedHabitData.title;
        habit.description = updatedHabitData.description;
        habit.status = updatedHabitData.status;
        this.habitsListComponent.updateHabits(this.habitsModel.getHabits());

        
        removeElement(this.habitsEditFormComponent);
        this.habitsEditFormComponent = null;
      });

      
      this.habitsEditFormComponent.setCancelEditHandler(() => {
        removeElement(this.habitsEditFormComponent); 
        this.habitsEditFormComponent = null;
      });
    }
  }
}
