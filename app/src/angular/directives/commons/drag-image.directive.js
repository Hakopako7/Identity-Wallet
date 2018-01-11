'use strict';

function DragImageDirective($log,$rootScope, $window,$document,ConfigFileService) {
    'ngInject';

    return {
        link: function(scope, element, attr) {
            let store = ConfigFileService.getStore();
            var startX = 0, startY = 0, x = store.profile.picture.position.x, y = store.profile.picture.position.y;

            element.css({
                position: 'absolute',
                cursor: 'pointer',
                left: x + 'px',
                top: y + 'px',
            });

            element.on('mousedown', function(event) {
                // Prevent default dragging of selected content
                event.preventDefault();
                startX = event.pageX - x;
                startY = event.pageY - y;
                $document.on('mousemove', mousemove);
                $document.on('mouseup', mouseup);
            });

            function mousemove(event) {
                y = event.pageY - startY;
                x = event.pageX - startX;
                if (x > 0){
                     x = 0;
                }

                if(x < (element.parent()[0].offsetHeight - element[0].offsetHeight))
                    x = element.parent()[0].offsetHeight - element[0].offsetHeight;

                if(y < (element.parent()[0].offsetWidth - element[0].offsetWidth))
                    y = element.parent()[0].offsetWidth - element[0].offsetWidth;

                if (y > 0) {
                    y = 0;
                }
                element.css({
                    top: y + 'px',
                    left:  x + 'px'
                });
            }

            function mouseup() {
                $rootScope.$broadcast("pos-event", {
                    position:{
                        y: y,
                        x: x
                    }
                });
                $document.off('mousemove', mousemove);
                $document.off('mouseup', mouseup);
            }
        }


    };
}

export default DragImageDirective;