class AppController {

  constructor() {
    this.favoritesTitle = 'favorites';
    this.favoritesMenuItems = [
      {title: 'News feed', iconClass: 'newspaper'},
      {title: 'Comments', iconClass: 'comments'},
      {title: 'Events', iconClass: 'calendar'}
    ];

    this.settingsTitle = 'settings';
    this.settingsMenuItems = [
      {title: 'Cloud profile', iconClass: 'cloud'},
      {title: 'Privacy', iconClass: 'privacy'},
      {title: 'History', iconClass: 'history'},
      {title: 'Language', iconClass: 'translate'}
    ];
  }

}

export default AppController;
