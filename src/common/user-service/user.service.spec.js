import commonModule from '../index';

describe('UserService', () => {
  'use strict';

  let UserService, $httpBackend, $timeout;

  beforeEach(window.module(commonModule.name));

  beforeEach(inject(($injector) => {
    UserService = $injector.get('UserService');
    $timeout = $injector.get('$timeout');
    $httpBackend = $injector.get('$httpBackend');
  }));

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be able to load user profile', () => {
    $httpBackend.expectJSONP(/http:\/\/www.filltext.com\/\?callback=JSON_CALLBACK&rows=1&fname=\{firstName}&lname=\{lastName}/).respond([
      {fname: 'User', lname: 'Test'}
    ]);

    UserService.getUserProfile().then(profile => expect(profile.data[0]).toBeDefined());
    $httpBackend.flush();
  });

  it('should be able to load list of user friends', () => {
    $httpBackend.expectJSONP(/http:\/\/www.filltext.com\/\?callback=JSON_CALLBACK&rows=3&fname=\{firstName}&lname=\{lastName}/).respond([
      {fname: 'User1', lname: 'Test1'},
      {fname: 'User2', lname: 'Test2'},
      {fname: 'User3', lname: 'Test3'}
    ]);

    UserService.getUserFriendsList(3, 1000).then(users => expect(users.data.length).toEqual(3));
    $httpBackend.flush();
    $timeout.flush();
  });
});
