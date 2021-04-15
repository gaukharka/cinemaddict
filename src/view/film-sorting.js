import {createElement} from '../utils.js';

const createFilmSortingElementTemplate = () => {
  return `<ul class="sort">
  <li><a href="#" class="sort__button sort__button-default sort__button--active">Sort by default</a></li>
  <li><a href="#" class="sort__button sort__button-date">Sort by date</a></li>
  <li><a href="#" class="sort__button sort__button-rating">Sort by rating</a></li>
</ul>`;
};

export default class FilmSorting {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmSortingElementTemplate();
  }

  getElement() {
    if(!this._element){
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
