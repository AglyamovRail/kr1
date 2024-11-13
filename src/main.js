import {render, RenderPosition} from './framework/render.js';
import HabitsBoardPresenter from './presenter/habits-board-presenter.js';
import HabitsModel from './model/habits-model.js';


const bodyContainer = document.querySelector('.container');


const habitsModel = new HabitsModel();


const habitsBoardPresenter = new HabitsBoardPresenter({
  boardContainer: bodyContainer,
  habitsModel
});


habitsBoardPresenter.init();
