'use strict';

import template from './tl-friends-list.html';
import './tl-friends-list.css';
import controller from './tl-friends-list.controller';

let tlFriendsList = ($rootScope, UserService) => {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller,
    controllerAs: 'vm'
  }
};

export default tlFriendsList;
