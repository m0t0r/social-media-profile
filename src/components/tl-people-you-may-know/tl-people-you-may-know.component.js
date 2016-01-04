'use strict';

import template from './tl-people-you-may-know.html';
import './tl-people-you-may-know.css';
import controller from './tl-people-you-may-know.controller';

let tlPeopleYouMayKnow = ($rootScope, UserService) => {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller,
    controllerAs: 'vm'
  }
};

export default tlPeopleYouMayKnow;
