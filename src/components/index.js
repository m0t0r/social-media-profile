'use strict';
import angular from 'angular';
import ngAnimate from 'angular-animate';
import toastr from 'angular-toastr';

import tlToolbarMenu from './tl-toolbar-menu/tl-toolbar-menu.component';

let componentsModule = angular
  .module('app.components', [
    ngAnimate,
    toastr
  ])
  .directive('tlToolbarMenu', tlToolbarMenu);

export default  componentsModule;
