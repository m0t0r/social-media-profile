'use strict';
import template from './app.component.html';

let appComponent = () => {
  return {
    restrict: 'E',
    transclude: true,
    template: template
  }
};

export default appComponent;
