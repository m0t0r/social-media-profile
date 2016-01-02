import componentsModule from '../index';

describe('tl-user-profile component', () => {
  'use strict';

  let $compile, elm, scope, UserService, $httpBackend;

  beforeEach(window.module(componentsModule.name));

  beforeEach(inject(($injector, $rootScope) => {
    $compile = $injector.get('$compile');
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');
    scope = $rootScope.$new();

    $httpBackend.expectJSONP(/http:\/\/www.filltext.com\/\?callback=JSON_CALLBACK&rows=1&fname=\{firstName}&lname=\{lastName}/).respond([
      {fname: 'John', lname: 'Smith'}
    ]);
  }));

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  function renderComponent() {
    elm = angular.element('<tl-user-profile></tl-user-profile>');

    $compile(elm)(scope);
    scope.$digest();

    return elm;
  }

  it('should be able to call UserService to load user profile', () => {
    spyOn(UserService, 'getUserProfile').and.callThrough();
    let component = renderComponent();
    let controller = component.controller('tlUserProfile');
    $httpBackend.flush();

    expect(UserService.getUserProfile).toHaveBeenCalled();
    expect(controller.user).toBeDefined();
  });

  it('should be able to display user name', () => {
    let component = renderComponent();
    $httpBackend.flush();

    expect(component.find('.username').text()).toEqual('John Smith');
  });
  
  it('should be able to set avatar url from user profile', () => {
    let component = renderComponent();
    $httpBackend.flush();

    expect(component.find('.image').attr('src')).toEqual('http://lorempixel.com/50/50/people');
  });
});
