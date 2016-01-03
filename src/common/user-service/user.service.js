class UserService {

  constructor($http, $timeout) {
    this._baseUrl = 'http://www.filltext.com/?callback=JSON_CALLBACK&';
    this.$http = $http;
    this.$timeout = $timeout;
  };

  getUserProfile() {
    return this.$http.jsonp(`${this._baseUrl}rows=1&fname={firstName}&lname={lastName}`)
      .then(profile => {
        // mock user avatar
        profile.data[0].avatarUrl = 'http://lorempixel.com/50/50/people';
        return profile;
      });
  }

  getUserFriendsList() {
    return this.$http.jsonp(`${this._baseUrl}rows=10&fname={firstName}&lname={lastName}`)
      .then(friends => {
        // mock user avatars
        friends.data.forEach((userObject, index) => userObject.avatarUrl = `http://lorempixel.com/50/50/people/${index}`);
        // simulate a little delay
        return this.$timeout(() => { return friends }, 1000);
      });
  }
}

export default UserService;
