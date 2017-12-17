'use strict';

function SkDialogDirective() {
    'ngInject';

    return {
        restrict: 'E',
        transclude: true,
        scope: {
            show: '='
        },
        link: (scope, element, attrs) => {
            console.log('attrs', attrs)
            scope.dialogStyle = {};
            if (attrs.width) {
                scope.dialogStyle.width = attrs.width;
            }
            if (attrs.height) {
                scope.dialogStyle.height = attrs.height;
            }
            if (attrs.minWidth) {
                scope.dialogStyle.minWidth = attrs.minWidth;
            }
            if (attrs.minHeight) {
                scope.dialogStyle.minHeight = attrs.minHeight;
            }

            scope.$watch(scope.show, function () {
                console.log('show', scope.show)
                if (scope.show === true) {
                    // var body = angular.element(document).find('body');
                    document.body.style.overflow = "hidden";
                } else {
                    document.body.style.overflow = "auto";
                }
            })

            scope.hideDialog = function () {
                scope.show = false;
            };
        },
        replace: true,
        templateUrl: 'common/directives/sk-dialog.html'
    }
}

export default SkDialogDirective;