'use strict';

import template from './tl-news-feed.html';
import './tl-news-feed.css';
import controller from './tl-news-feed.controller';

let tlNewsFeed = (UserService) => {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller,
    controllerAs: 'vm'
  }
};

export default tlNewsFeed;
