import {habits} from '../mock/habit.js'; 

export default class HabitsModel {
  constructor() {
    this.habits = habits;
  }

  getHabits() {
    return this.habits;
  }

  addHabit(habit) {
    this.habits.push(habit); 
  }

  updateHabitStatus(id, newStatus) {
    const habit = this.habits.find(h => h.id === id);
    if (habit) {
      habit.status = newStatus;
    }
  }
}
