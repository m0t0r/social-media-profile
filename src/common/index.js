'use strict';
import angular from 'angular';

import UserService from './user-service/user.service';

let commonModule = angular
  .module('app.common', [])
  .service('UserService', UserService);

export default  commonModule;
