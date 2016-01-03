import componentsModule from '../index';

describe('tl-user-status component', () => {
  'use strict';

  let $rootScope, $compile, elm, scope;

  beforeEach(window.module(componentsModule.name));

  beforeEach(inject(($injector) => {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
    scope = $rootScope.$new();
  }));

  function renderComponent() {
    elm = angular.element('<tl-user-status></tl-user-status>');

    $compile(elm)(scope);
    scope.$digest();

    return elm;
  }

  it('should be able to post user status', () => {
    spyOn($rootScope, '$broadcast');
    let component = renderComponent();
    let controller = component.controller('tlUserStatus');

    controller.userStatus = 'Test status';
    controller.postStatus();

    expect($rootScope.$broadcast).toHaveBeenCalledWith('tl-user-status', 'Test status');
  });
});
