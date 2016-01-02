'use strict';
import './app.css';

import angular from 'angular';
import AppComponent from './app.component';
import Components from './components';
import Common from './common';

angular
  .module('socialMediaApp', [
    Components.name,
    Common.name
  ])
  .directive('app', AppComponent);
