import AbstractView from './abstract.js';

const createAllFilmsListTemplate = () => {
  return `<section class="films-list films-list--main">
  <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
  <div class="films-list__container">
  </div>
  </section>`;
};
export default class FilmListMain extends AbstractView {
  getTemplate() {
    return createAllFilmsListTemplate();
  }
}
