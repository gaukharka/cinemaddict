import Observer from '../utils/observer';

export default class Films extends Observer {
  constructor() {
    super();
    this._films = [];
  }

  setFilms(updateType, films) {
    this._films = films.slice();

    this._notify(updateType);
  }

  getFilms() {
    return this._films;
  }

  updateFilm(updateType, update) {
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  static adaptToClient(film) {
    const adaptedFilm = Object.assign(
      {},
      film,
      {
        filmInfo: {
          title: film.film_info.title,
          alternativelTitle: film.film_info.alternative_title,
          rating: film.film_info.total_rating,
          poster: film.film_info.poster,
          ageAllowance: film.film_info.age_rating,
          director: film.film_info.director,
          writers: film.film_info.writers,
          actors: film.film_info.actors,
          release: {
            releaseDate: film.film_info.release.date,
            country: film.film_info.release.release_country,
          },
          runtime: film.film_info.runtime,
          genre: film.film_info.genre,
          description: film.film_info.description,
        },
        userDetails: {
          watchList: film.user_details.watchlist,
          alreadyWatched: film.user_details.already_watched,
          favorite: film.user_details.favorite,
          watchingDate: film.user_details.watching_date,
        },
      },
    );

    delete adaptedFilm.film_info;
    delete adaptedFilm.user_details;

    return adaptedFilm;
  }

  static adaptToServer(film) {
    const adaptedFilm = Object.assign(
      {},
      film,
      {
        'film_info': {
          'title': film.filmInfo.title,
          'alternative_title': film.filmInfo.alternativelTitle,
          'total_rating': film.filmInfo.rating,
          'poster': film.filmInfo.poster,
          'age_rating': film.filmInfo.ageAllowance,
          'director': film.filmInfo.director,
          'writers': film.filmInfo.writers,
          'actors': film.filmInfo.actors,
          'release': {
            'date': film.filmInfo.release.releaseDate,
            'release_country': film.filmInfo.release.country,
          },
          'runtime': film.filmInfo.runtime,
          'genre': film.filmInfo.genre,
          'description': film.filmInfo.description,
        },
        'user_details': {
          'watchlist': film.userDetails.watchList,
          'already_watched': film.userDetails.alreadyWatched,
          'favorite': film.userDetails.favorite,
          'watching_date': film.userDetails.watchingDate,
        },
      },
    );

    delete adaptedFilm.filmInfo;
    delete adaptedFilm.userDetails;

    return adaptedFilm;
  }
}
