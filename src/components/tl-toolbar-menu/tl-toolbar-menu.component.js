'use strict';

import template from './tl-toolbar-menu.html';
import './tl-toolbar-menu.css';
import controller from './tl-toolbar-menu.controller';

let tlToolbarMenu = (toastr) => {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller,
    controllerAs: 'vm'
  }
};

export default tlToolbarMenu;
