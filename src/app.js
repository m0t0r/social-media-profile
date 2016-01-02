'use strict';
import './app.css';

import angular from 'angular';
import AppComponent from './app.component';
import Components from './components';

angular
  .module('socialMediaApp', [
    Components.name
  ])
  .directive('app', AppComponent);
