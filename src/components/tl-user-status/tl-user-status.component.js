'use strict';

import template from './tl-user-status.html';
import './tl-user-status.css';
import controller from './tl-user-status.controller';

let tlUserStatus = ($rootScope) => {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller,
    controllerAs: 'vm'
  }
};

export default tlUserStatus;
