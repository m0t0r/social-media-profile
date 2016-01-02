class UserService {

  constructor($http) {
    this._baseUrl = 'http://www.filltext.com/?callback=JSON_CALLBACK&';
    this.$http = $http;
  };

  getUserProfile() {
    return this.$http.jsonp(`${this._baseUrl}rows=1&fname={firstName}&lname={lastName}`)
      .then(profile => {
        // mock user avatar
        profile.data[0].avatarUrl = 'http://lorempixel.com/50/50/people';
        return profile;
      });
  }
}

export default UserService;
