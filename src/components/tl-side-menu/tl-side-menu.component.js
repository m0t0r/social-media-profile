'use strict';

import template from './tl-side-menu.html';
import controller from './tl-side-menu.controller';

let tlSideMenu = () => {
  return {
    restrict: 'E',
    scope: {
      title: '=',
      menuItems: '='
    },
    template,
    controller,
    controllerAs: 'vm',
    bindToController: true
  }
};

export default tlSideMenu;
