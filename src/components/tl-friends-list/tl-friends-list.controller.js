class tlFriendsListController {

  constructor($element, UserService, RandomService) {
    this.$element = $element;
    this.userService = UserService;
    this.randomService = RandomService;

    this.loadUserFriendsList();
    this.$element.find('.segment').addClass('loading');
  }

  loadUserFriendsList() {
    this.userService.getUserFriendsList().then(friends => {
      this.randomService.setRandomUserStatus(friends.data).then(friends => this.userFriends = friends);

      this.$element.find('.segment').removeClass('loading');
    });
  }
}

export default tlFriendsListController;