import componentsModule from '../index';

describe('tl-news-feed component', () => {
  'use strict';

  let $compile, elm, $rootScope, scope, $httpBackend, $timeout, RandomService;

  beforeEach(window.module(componentsModule.name));

  beforeEach(inject(($injector) => {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
    $httpBackend = $injector.get('$httpBackend');
    RandomService = $injector.get('RandomService');
    $timeout = $injector.get('$timeout');
    scope = $rootScope.$new();

    $httpBackend.expectJSONP(/http:\/\/www.filltext.com\/\?callback=JSON_CALLBACK&rows=5&fname=\{firstName}&lname=\{lastName}/).respond([
      {fname: 'Tom', lname: 'Smith'},
      {fname: 'Bob', lname: 'Smith'}
    ]);
  }));

  function renderComponent() {
    elm = angular.element('<tl-news-feed></tl-news-feed>');

    $compile(elm)(scope);
    scope.$digest();

    return elm;
  }

  it('should be able to load user friends list', () => {
    let component = renderComponent();
    let controller = component.controller('tlNewsFeed');
    $httpBackend.flush();
    $timeout.flush();

    expect(controller.userFriends.length).not.toEqual(0);
  });

  it('should be able to call RandomService to set mock activities for users', () => {
    spyOn(RandomService, 'setRandomUserActivity').and.callThrough();
    renderComponent();
    $httpBackend.flush();
    $timeout.flush();

    expect(RandomService.setRandomUserActivity).toHaveBeenCalled();
  });

  it('should be able to have loading state when fetching data', () => {
    let component = renderComponent();

    expect(component.find('.segment').hasClass('loading')).toEqual(true);
    $httpBackend.flush();
    $timeout.flush();

    expect(component.find('.segment').hasClass('loading')).toEqual(false);
  });

  it('should be able add like for activity only once', () => {
    let component = renderComponent();
    let controller = component.controller('tlNewsFeed');
    $httpBackend.flush();
    $timeout.flush();

    let initialLikesValue = controller.userFriends[0].activity.likes;
    controller.addLike(controller.userFriends[0].activity);
    expect(controller.userFriends[0].activity.likes).toEqual(initialLikesValue + 1);

    controller.addLike(controller.userFriends[0].activity);
    expect(controller.userFriends[0].activity.likes).toEqual(controller.userFriends[0].activity.likes);
  });
  
  it('should be able to add liked class when an activity was liked', () => {
    let component = renderComponent();
    let controller = component.controller('tlNewsFeed');
    $httpBackend.flush();
    $timeout.flush();
    
    expect(component.find('.like:eq(0)').hasClass('liked')).toEqual(false);

    controller.addLike(controller.userFriends[0].activity);
    scope.$apply();
    expect(component.find('.like:eq(0)').hasClass('liked')).toEqual(true);
  });
  
  it('should be able to display full user name in the news feed', () => {
    let component = renderComponent();
    $httpBackend.flush();
    $timeout.flush();
    
    expect(component.find('.user:eq(1)').text().trim()).toEqual('Bob Smith');
  });

  it('should be able to display user activity description in the news feed', () => {
    let component = renderComponent();
    $httpBackend.flush();
    $timeout.flush();
    expect(component.find('.summary:eq(1)').text().trim().length).toBeGreaterThan(0);
  });

  it('should be able to display user activity time in the news feed', () => {
    let component = renderComponent();
    $httpBackend.flush();
    $timeout.flush();
    expect(component.find('.date:eq(0)').text().trim().length).toBeGreaterThan(0);
  });
  
  it('should be able to display time of user status update as a message', () => {
    let component = renderComponent();
    let controller = component.controller('tlNewsFeed');
    $httpBackend.flush();
    $timeout.flush();
    controller.userFriends[0].activity.timeAgo = 0;
    scope.$apply();

    expect(component.find('.date:eq(0)').text().trim()).toEqual('a few seconds ago');
  });

  it('should be able to display number of an activity likes in the news feed', () => {
    let component = renderComponent();
    $httpBackend.flush();
    $timeout.flush();
    expect(component.find('.like:eq(0)').text().trim().length).toBeGreaterThan(0);
  });

  it('should be able to post user status on event', () => {
    let component = renderComponent();
    let controller = component.controller('tlNewsFeed');
    $httpBackend.flush();
    $timeout.flush();

    expect(controller.userFriends.length).toEqual(2);

    $httpBackend.expectJSONP(/http:\/\/www.filltext.com\/\?callback=JSON_CALLBACK&rows=1&fname=\{firstName}&lname=\{lastName}/).respond([
      {fname: 'User', lname: 'Test'}
    ]);
    $rootScope.$broadcast('tl-user-status', 'unit testing');
    $httpBackend.flush();

    expect(controller.userFriends.length).toEqual(3);
    expect(controller.userFriends[0].activity.description).toEqual('updated his/her status');
  });
});
