'use strict';

import angular from 'angular';

import UserService from './user-service/user.service';
import RandomService from './random-service/random.service';

let commonModule = angular
  .module('app.common', [])
  .service('UserService', UserService)
  .service('RandomService', RandomService);

export default  commonModule;
