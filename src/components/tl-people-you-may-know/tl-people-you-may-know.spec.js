import componentsModule from '../index';

describe('tl-people-you-may-know component', () => {
  'use strict';

  var $rootScope, $compile, elm, scope, $httpBackend, $timeout;

  beforeEach(window.module(componentsModule.name));

  beforeEach(inject(($injector) => {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
    $httpBackend = $injector.get('$httpBackend');
    $timeout = $injector.get('$timeout');
    scope = $rootScope.$new();

    $httpBackend.expectJSONP(/http:\/\/www.filltext.com\/\?callback=JSON_CALLBACK&rows=2&fname=\{firstName}&lname=\{lastName}/).respond([
      {fname: 'Chris', lname: 'Bond'},
      {fname: 'Mike', lname: 'Bond'}
    ]);
  }));

  function renderComponent() {
    elm = angular.element('<tl-people-you-may-know></tl-people-you-may-know>');

    $compile(elm)(scope);
    scope.$digest();

    return elm;
  }

  it('should be able to load users suggested as friends', () => {
    let component = renderComponent();
    let controller = component.controller('tlPeopleYouMayKnow');
    $httpBackend.flush();
    $timeout.flush();

    expect(controller.suggestedPeople.length).toEqual(2);
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

    expect(component.find('.content:eq(1)').text().trim()).toEqual('Chris Bond')
  });

  it('should be able to add user as a friend', () => {
    spyOn($rootScope, '$broadcast');
    let component = renderComponent();
    let controller = component.controller('tlPeopleYouMayKnow');
    $httpBackend.flush();
    $timeout.flush();

    expect(controller.suggestedPeople.length).toEqual(2);
    let userToAdd = controller.suggestedPeople[0];
    controller.addUser(userToAdd);

    expect($rootScope.$broadcast).toHaveBeenCalledWith('add-suggested-user', userToAdd);
    expect(controller.suggestedPeople.length).toEqual(1);
  });

  it('should be able to skip user as a friend', () => {
    let component = renderComponent();
    let controller = component.controller('tlPeopleYouMayKnow');
    $httpBackend.flush();
    $timeout.flush();

    expect(controller.suggestedPeople.length).toEqual(2);

    controller.skipUser(controller.suggestedPeople[0]);

    expect(controller.suggestedPeople.length).toEqual(1);
  });

  it('should be hidden when there are no suggested users', () => {
    let component = renderComponent();
    let controller = component.controller('tlPeopleYouMayKnow');
    $httpBackend.flush();
    $timeout.flush();

    expect(component.find('.segment').hasClass('ng-hide')).toEqual(false);

    controller.skipUser(controller.suggestedPeople[0]);
    controller.skipUser(controller.suggestedPeople[0]);
    scope.$apply();

    expect(component.find('.segment').hasClass('ng-hide')).toEqual(true);
  });
});
