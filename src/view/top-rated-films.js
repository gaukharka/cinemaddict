import AbstractView from './abstract.js';

const createTopRatedFilmsTemplate = () => {
  return `<section class="films-list films-list--extra films-list--top">
  <h2 class="films-list__title">Top rated</h2>
  <div class="films-list__container">
  </div>
</section>`;
};
export default class TopRatedFilms extends AbstractView {
  getTemplate() {
    return createTopRatedFilmsTemplate();
  }

  getContainer() {
    if (!this._container) {
      this._container =  this.getElement().querySelector('.films-list__container');
    }

    return this._container;
  }
}

