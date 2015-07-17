/**
  angular done-typing directive.
  <input ng-model="vm.modelValue" done-typing="vm.doStuff(vm.modelValue)" delay="1" />
**/
class DoneTyping {

  constructor() {
    this.restrict = 'A';
  }

  link(scope,el,attrs) {

     // init a var to hold the identifier for the last setTimeout that was fired on el
    var timeoutCounter = 0;

    // add 'doneTyping' listener to this element.
    el.on('keydown', function(event) {

      // cb should not be triggered on keydown of alt or tab keys
      if(event.altKey || event.keyCode == 9) return;

      clearTimeout(timeoutCounter);

      var cb = function() {
        scope.$eval(attrs.doneTyping);
        scope.$apply();
      }

      timeoutCounter = setTimeout(cb, 1000*parseInt(attrs.delay||1));

    })

    el.on('blur',function(event) {
      clearTimeout(timeoutCounter);
      scope.$eval(attrs.doneTyping);
      scope.$apply();
    })

  }

  static directive() {
    return new DoneTyping();
  }

}


export default angular
  .module('doneTyping',[])
  .directive('doneTyping', DoneTyping.directive)


