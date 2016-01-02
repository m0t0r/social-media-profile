import commonModule from '../index';

describe('UserService', () => {
  'use strict';

  let UserService, $httpBackend;

  beforeEach(window.module(commonModule.name));

  beforeEach(inject(($injector) => {
    UserService = $injector.get('UserService');
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
});
