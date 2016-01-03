class tlSideMenuController {

  constructor($element, toastr) {
    this.toastr = toastr;
    $element.find('.menu').on('click', this.showToastrMessage.bind(this));
  }

  showToastrMessage(e) {
    if (e.target && e.target.nodeName == "A" && !angular.element(e.target).hasClass('active')) {
      this.toastr.warning('This feature is not supported yet', 'Sorry', {closeButton: true, timeOut: 1500});
    }
  }
}

export default tlSideMenuController;
