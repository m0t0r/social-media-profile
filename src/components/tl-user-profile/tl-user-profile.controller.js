class tlUserProfileController {

  constructor(UserService) {
    this.userService = UserService;
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.userService.getUserProfile().then(profile => this.user = profile.data[0]);
  }
}

export default tlUserProfileController;