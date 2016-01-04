'use strict';
import angular from 'angular';
import ngAnimate from 'angular-animate';
import toastr from 'angular-toastr';
import Common from '../common';

import tlToolbarMenu from './tl-toolbar-menu/tl-toolbar-menu.component';
import tlUserProfile from './tl-user-profile/tl-user-profile.component';
import tlFriendsList from './tl-friends-list/tl-friends-list.component';
import tlNewsFeed from './tl-news-feed/tl-news-feed.component';
import tlUserStatus from './tl-user-status/tl-user-status.component';
import tlSideMenu from './tl-side-menu/tl-side-menu.component';
import tlPeopleYouMayKnow from './tl-people-you-may-know/tl-people-you-may-know.component';

let componentsModule = angular
  .module('app.components', [
    ngAnimate,
    toastr,
    Common.name
  ])
  .directive('tlToolbarMenu', tlToolbarMenu)
  .directive('tlUserProfile', tlUserProfile)
  .directive('tlFriendsList', tlFriendsList)
  .directive('tlNewsFeed', tlNewsFeed)
  .directive('tlUserStatus', tlUserStatus)
  .directive('tlSideMenu', tlSideMenu)
  .directive('tlPeopleYouMayKnow', tlPeopleYouMayKnow);

export default  componentsModule;
