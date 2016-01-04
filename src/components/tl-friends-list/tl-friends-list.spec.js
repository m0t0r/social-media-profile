import componentsModule from '../index';

describe('tl-friends-list component', () => {
  'use strict';

  var $rootScope, $compile, elm, scope, $httpBackend, $timeout;

  beforeEach(window.module(componentsModule.name));

  beforeEach(inject(($injector) => {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
    $httpBackend = $injector.get('$httpBackend');
    $timeout = $injector.get('$timeout');
    scope = $rootScope.$new();

    $httpBackend.expectJSONP(/http:\/\/www.filltext.com\/\?callback=JSON_CALLBACK&rows=10&fname=\{firstName}&lname=\{lastName}/).respond([
      {fname: 'John', lname: 'Bond'},
      {fname: 'Mike', lname: 'Bond'},
      {fname: 'James', lname: 'Bond'}
    ]);
  }));

  function renderComponent() {
    elm = angular.element('<tl-friends-list></tl-friends-list>');

    $compile(elm)(scope);
    scope.$digest();

    return elm;
  }

  it('should be able to load user friends list', () => {
    let component = renderComponent();
    let controller = component.controller('tlFriendsList');
    $httpBackend.flush();
    $timeout.flush();

    expect(controller.userFriends.length).not.toEqual(0);
  });

  it('should be able to have loading state when fetching data', () => {
    let component = renderComponent();

    expect(component.find('.segment').hasClass('loading')).toEqual(true);
    $httpBackend.flush();
    $timeout.flush();

    expect(component.find('.segment').hasClass('loading')).toEqual(false);
  });
  
  it('should be able to display full user name', () => {
    let component = renderComponent();
    $httpBackend.flush();
    $timeout.flush();
    
    expect(component.find('.content:eq(1)').text().trim()).toEqual('John Bond')
  });

  it('should be able to display online status of a user', () => {
    let component = renderComponent();
    let controller = component.controller('tlFriendsList');
    $httpBackend.flush();
    $timeout.flush();

    // mock active status
    controller.userFriends[0].active = true;
    scope.$apply();

    expect(component.find('.floated.content i').hasClass('icon')).toEqual(true);
  });

  it('should be able to display last online time of a user', () => {
    let component = renderComponent();
    let controller = component.controller('tlFriendsList');
    $httpBackend.flush();
    $timeout.flush();

    // mock active status
    controller.userFriends[0].active = false;
    controller.userFriends[0].lastOnline =  17;
    scope.$apply();

    expect(component.find('.floated.content:eq(0) span').text()).toEqual('17min');
  });

  it('should be able to add a user as friend on event', () => {
    let component = renderComponent();
    let controller = component.controller('tlFriendsList');
    $httpBackend.flush();
    $timeout.flush();

    expect(controller.userFriends.length).toEqual(3);

    $rootScope.$broadcast('add-suggested-user', {fname: 'James', lname: 'Bond'});

    expect(controller.userFriends.length).toEqual(4);
    expect(controller.userFriends[0].fname).toEqual('James');
  });
});
