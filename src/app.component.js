'use strict';

import template from './app.component.html';
import controller from './app.controller';

let appComponent = () => {
  return {
    restrict: 'E',
    transclude: true,
    template,
    controller,
    controllerAs: 'vm'
  }
};

export default appComponent;
