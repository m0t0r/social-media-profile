'use strict';

class tlNewsFeedController {

  constructor($rootScope, $element, UserService, RandomService) {
    this.$rootScope = $rootScope;
    this.$element = $element;
    this.userService = UserService;
    this.randomService = RandomService;

    this.loadUserNewsFeed();
    this.$element.find('.segment').addClass('loading');
    this._addListenerForUserStatusChange();
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

  _addListenerForUserStatusChange() {
    this.$rootScope.$on('tl-user-status', (e, status) => {
      this.userService.getUserProfile().then(profile => {
        profile.data[0].activity = {
          name: 'post',
          description: 'updated his/her status',
          content: status,
          likes: 0,
          timeAgo: 0
        };
        this.userFriends.unshift(profile.data[0]);
      });
    });
  }
}

export default tlNewsFeedController;
