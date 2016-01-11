'use strict';

class tlToolbarMenuController {

  constructor($element, toastr) {
    this.toastr = toastr;
    this.siteName = 'Social-media profile';

    this.menuItems = [
      {name: 'Home', url: '#'},
      {name: 'Timeline', url: '#'}
    ];

    $element.find('.container').on('click', this.showToastrMessage.bind(this));
  }
  
  showToastrMessage(e) {
    if (e.target && e.target.nodeName == "A" && !angular.element(e.target).hasClass('active')) {
      this.toastr.warning('This feature is not supported yet', 'Sorry', {closeButton: true, timeOut: 1500});
    }
  }
}

export default tlToolbarMenuController;
