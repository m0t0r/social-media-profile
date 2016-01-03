class tlUserStatusController {

  constructor($rootScope) {
    this.$rootScope = $rootScope;
  }
  
  postStatus() {
    if (this.userStatus && this.userStatus.length > 0) {
      this.$rootScope.$broadcast('tl-user-status', this.userStatus);
      this.userStatus = '';
    }
  }
}

export default tlUserStatusController;
