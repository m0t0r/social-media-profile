'use strict';

class AppController {

  constructor() {
    this.favoritesTitle = 'favorites';
    this.settingsTitle = 'settings';

    this.setFavoritesMenuItems();
    this.setSettingsMenuItems();
  }

  setFavoritesMenuItems() {
    this.favoritesMenuItems = [
      {title: 'News feed', iconClass: 'newspaper'},
      {title: 'Comments', iconClass: 'comments'},
      {title: 'Events', iconClass: 'calendar'}
    ];
  }

  setSettingsMenuItems() {
    this.settingsMenuItems = [
      {title: 'Cloud profile', iconClass: 'cloud'},
      {title: 'Privacy', iconClass: 'privacy'},
      {title: 'History', iconClass: 'history'},
      {title: 'Language', iconClass: 'translate'}
    ];
  }

}

export default AppController;
