import AbstractView from './abstract.js';
import {generateUserRank} from '../utils/rank.js';

const createUserRankTemplate = (userRank) => {

  return `<section class="header__profile profile">
  <p class="profile__rating">${generateUserRank(userRank)}</p>
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
</section>`;
};
export default class UserRank extends AbstractView {
  constructor(userRank) {
    super();
    this._userRank = userRank;
  }

  getTemplate() {
    return createUserRankTemplate(this._userRank);
  }
}
