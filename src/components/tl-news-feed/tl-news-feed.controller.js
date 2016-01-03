class tlNewsFeedController {

  constructor($element, UserService, RandomService) {
    this.$element = $element;
    this.userService = UserService;
    this.randomService = RandomService;

    this.loadUserNewsFeed();
    this.$element.find('.segment').addClass('loading');
  }

  loadUserNewsFeed() {
    this.userService.getUserFriendsList(5, 1500).then(friends => {
      this.randomService.setRandomUserActivity(friends.data).then(friends => this.userFriends = friends);

      this.$element.find('.segment').removeClass('loading');
    });
  }

  addLike(activity) {
    if (!activity.liked) {
      activity.likes += 1;
      activity.liked = true;
    }
  }
}

export default tlNewsFeedController;
