/**
  angular done-typing directive.
  <input ng-model="vm.modelValue" done-typing="vm.doStuff(vm.modelValue)" delay="1" />
**/

var DoneTyping = (function () {
  function DoneTyping() {
    this.restrict = "A";
  }

  DoneTyping.prototype.link = function link(scope, el, attrs) {

    // init a var to hold the identifier for the last setTimeout that was fired on el
    var timeoutCounter = 0;

    // add 'doneTyping' listener to this element.
    el.on("keydown", function (event) {

      // cb should not be triggered on keydown of alt or tab keys
      if (event.altKey || event.keyCode == 9) return;

      clearTimeout(timeoutCounter);

      var cb = function cb() {
        scope.$eval(attrs.doneTyping);
        scope.$apply();
      };

      timeoutCounter = setTimeout(cb, 1000 * parseInt(attrs.delay || 1));
    });

    el.on("blur", function (event) {
      clearTimeout(timeoutCounter);
      scope.$eval(attrs.doneTyping);
      scope.$apply();
    });
  };

  DoneTyping.directive = function directive() {
    return new DoneTyping();
  };

  return DoneTyping;
})();


angular
  .module('doneTyping',[])
  .directive('doneTyping', DoneTyping.directive);
