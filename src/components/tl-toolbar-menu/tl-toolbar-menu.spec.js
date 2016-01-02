import componentsModule from '../index';

describe('tl-toolbar-menu component', () => {
  'use strict';
  
  let $compile, elm, scope, toastr;

  beforeEach(window.module(componentsModule.name));

  beforeEach(inject(($injector, $rootScope) => {
    $compile = $injector.get('$compile');
    toastr = $injector.get('toastr');
    scope = $rootScope.$new();
  }));

  function renderComponent() {
    elm = angular.element('<tl-toolbar-menu></tl-toolbar-menu>');

    $compile(elm)(scope);
    scope.$digest();

    return elm;
  }
  
  it('should have defined site name property', () => {
    let component = renderComponent();
    let controller = component.controller('tlToolbarMenu');
    
    expect(controller.siteName).toBeDefined();
  });

  it('should have defined menu list items', () => {
    let component = renderComponent();
    let controller = component.controller('tlToolbarMenu');

    expect(controller.menuItems).toBeDefined();
  });

  it('should call toastr service to show friendly message about unsupported features', () => {
    let component = renderComponent();
    let toastrSpy = spyOn(toastr, 'warning');

    component.find('a').eq(3).click();
    expect(toastrSpy).toHaveBeenCalled();
  });
});
