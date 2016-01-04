class tlPeopleYouMayKnowController {

  constructor($rootScope, $element, UserService) {
    this.$rootScope = $rootScope;
    this.$element = $element;
    this.userService = UserService;


    this.loadSuggestedFriends();
    this.$element.find('.segment').addClass('loading');
  }

  loadSuggestedFriends() {
    this.userService.getUserFriendsList(2, 700).then(users => {
      this.suggestedPeople = users.data;

      this.$element.find('.segment').removeClass('loading');
    });
  }

  _removeUserFromSuggestion(user) {
    var index = this.suggestedPeople.indexOf(user);
    this.suggestedPeople.splice(index, 1);
    this.noUsersToSuggest = this.suggestedPeople.length === 0;
  }

  addUser(user) {
    this.$rootScope.$broadcast('add-suggested-user', user);
    this._removeUserFromSuggestion(user);
  }

  skipUser(user) {
    this._removeUserFromSuggestion(user);
  }
}

export default tlPeopleYouMayKnowController;
