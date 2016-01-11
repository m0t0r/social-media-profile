'use strict';

import template from './tl-user-profile.html';
import './tl-user-profile.css';
import controller from './tl-user-profile.controller';

let tlUserProfile = (UserService) => {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller,
    controllerAs: 'vm'
  }
};

export default tlUserProfile;