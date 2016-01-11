'use strict';

class UserService {

  constructor($http, $timeout, $q) {
    this.$http = $http;
    this.$timeout = $timeout;
    this.$q = $q;

    this._profile = null;
    this._baseUrl = 'http://www.filltext.com/?callback=JSON_CALLBACK&';
  };

  getUserProfile() {
    if (!this._profile) {
      return this.$http.jsonp(`${this._baseUrl}rows=1&fname={firstName}&lname={lastName}`)
        .then(profile => {
          // mock user avatar
          profile.data[0].avatarUrl = 'http://lorempixel.com/50/50/people';
          this._profile = profile;
          return this._profile;
        });
    } else {
      return this.$q(resolve => resolve(this._profile));
    }
  }

  getUserFriendsList(rows, delay) {
    return this.$http.jsonp(`${this._baseUrl}rows=${rows}&fname={firstName}&lname={lastName}`)
      .then(friends => {
        // mock user avatars
        friends.data.forEach((userObject, index) => userObject.avatarUrl = `http://lorempixel.com/50/50/people/${index}`);
        // simulate a little delay
        return this.$timeout(() => { return friends }, delay);
      });
  }
}

export default UserService;
