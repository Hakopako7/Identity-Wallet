'use strict';

export default angular.module('flyoutDirective', [])
  .directive('openFlyout', ['$document', openFlyout])
  .directive('closeFlyout', ['$document', closeFlyout])
  .directive('scroll', ['$document', scroll]);


function openFlyout($document) {
  console.log("here");
  return {
    restrict: 'AC',
    link: (scope, element, attrs) => { 
      let flyOutEl = angular.element(document.querySelector( "#flyout-window" ));
      element.on('mousedown', (e) => {
        if( e.target.classList['value'].indexOf( 'more-info' ) == -1 ) {
          //We need a delay so that the ng-click is also propagated
          setTimeout(() => {
            angular.element(document.body).addClass("flyout-visible");
            flyOutEl.addClass("visible");
          }, 200);
        }

      });
    }
  }
}

function closeFlyout($document) {

  return {
    restrict: 'AC',
    link: (scope, element, attrs) => {
      element.on('mousedown', (e) => {
        angular.element(document.body).removeClass("flyout-visible");
      });
    }
  }
}

function scroll ($document) {

  return {
    link: (scope, element, attrs) => {
      let flyOutEl = angular.element(document.querySelector( "#flyout-window" ));

      element.on('scroll', (e) => {
        
        if( e.currentTarget.scrollTop > 10 ) {
          flyOutEl.addClass( 'reduced' ); 
        } else {
          flyOutEl.removeClass( 'reduced' ); 
        }
      });
    }
  }
}