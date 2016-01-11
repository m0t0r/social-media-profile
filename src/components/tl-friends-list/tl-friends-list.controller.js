'use strict';

class tlFriendsListController {

  constructor($element, $rootScope, UserService, RandomService) {
    this.$rootScope = $rootScope;
    this.$element = $element;
    this.userService = UserService;
    this.randomService = RandomService;

    this.loadUserFriendsList();
    this.$element.find('.segment').addClass('loading');
    this._addListenerToAddSuggestedUser();
  }

  loadUserFriendsList() {
    this.userService.getUserFriendsList(10, 1000).then(friends => {
      this.randomService.setRandomUserStatus(friends.data).then(friends => this.userFriends = friends);

      this.$element.find('.segment').removeClass('loading');
    });
  }

  _addListenerToAddSuggestedUser() {
    this.$rootScope.$on('add-suggested-user', (e, user) => {
      user.active = true;
      this.userFriends.unshift(user);
    });
  }
}

export default tlFriendsListController;