import componentsModule from '../index';

describe('tl-side-menu component', () => {
  'use strict';

  var $compile, elm, scope, toastr;

  beforeEach(window.module(componentsModule.name));

  beforeEach(inject(($injector, $rootScope) => {
    $compile = $injector.get('$compile');
    toastr = $injector.get('toastr');
    scope = $rootScope.$new();

    scope.title = 'Test Title';
    scope.menuItems = [
      {title: 'Item 1', iconClass: 'icon1'},
      {title: 'Item 2', iconClass: 'icon2'}
    ];
  }));

  function renderComponent() {
    elm = angular.element('<tl-side-menu title="title" menu-items="menuItems"></tl-side-menu>');

    $compile(elm)(scope);
    scope.$digest();

    return elm;
  }

  it('should have defined title property', () => {
    let component = renderComponent();

    expect(component.find('.header').text()).toEqual('Test Title');
  });

  it('should be have defined menu items', () => {
    let component = renderComponent();
    expect(component.find('.item').length).toEqual(3);
  });

  it('should be have defined menu items classes', () => {
    let component = renderComponent();
    expect(component.find('.item:eq(1) i').hasClass('icon1')).toEqual(true);
  });

  it('should call toastr service to show friendly message about unsupported features', () => {
    let component = renderComponent();
    let toastrSpy = spyOn(toastr, 'warning');

    component.find('a:eq(0)').click();
    expect(toastrSpy).toHaveBeenCalled();
  });
});
