import StatsView from './view/stats.js';
import UserRankView from './view/user-rank.js';
import FooterStatsView from './view/footer-stats.js';
import {remove, render} from './utils/render.js';
import FilmCardsBoardPresenter from './presenter/films-board.js';
import FilterPresenter from './presenter/filter.js';
import FilmsModel from './model/films-model.js';
import FilterModel from './model/filters-model.js';
import CommentsModel from './model/comments-model.js';
import { MenuItem, UpdateType } from './const.js';
import Api from './api.js';

const AUTHORIZATION = 'Basic at2we52fv27551e';
const END_POINT = 'https://14.ecmascript.pages.academy/cinemaddict';

const bodyElement = document.querySelector('body');
const headerElement = bodyElement.querySelector('.header');
const mainElement = bodyElement.querySelector('.main');
const footer = bodyElement.querySelector('.footer');
const footerElement = footer.querySelector('.footer__statistics');

const api = new Api(END_POINT, AUTHORIZATION);
const filmsModel = new FilmsModel();
const filterModel = new FilterModel();
const commentsModel = new CommentsModel();
let statsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch(menuItem) {
    case MenuItem.FILMS:
      remove(statsComponent);
      filmsCardsBoardPresenter.destroy();
      filmsCardsBoardPresenter.init();
      break;
    case MenuItem.STATS:
      remove(statsComponent);
      filmsCardsBoardPresenter.destroy();
      statsComponent = new StatsView(filmsModel.getFilms());
      render(mainElement, statsComponent, 'beforeend');
      break;
  }
};


const filmsCardsBoardPresenter = new FilmCardsBoardPresenter(bodyElement, mainElement, filmsModel, filterModel, commentsModel, api);
const filterPresenter = new FilterPresenter(mainElement, filterModel, filmsModel, handleSiteMenuClick);

filterPresenter.init();
filmsCardsBoardPresenter.init();

api.getFilms()
  .then((films) => {
    filmsModel.setFilms(UpdateType.INIT, films);
    render(headerElement, new UserRankView(filmsModel.getFilms()), 'beforeend');
    render(footerElement, new FooterStatsView(filmsModel.getFilms().length), 'beforeend');
  })
  .catch(() => {
    filmsModel.setFilms(UpdateType.INIT, []);
  });
