'use strict';

import EditGeneralInfoDialog from "../../controllers/commons/dialogs/edit-general-info-controller";

function SkWalletGeneralInfoBoxDirective($rootScope,$log, $window, $mdDialog, ConfigFileService,SelfkeyService) {
    'ngInject';

    return {
        restrict: 'E',
        scope: {
            config: '='
        },
        link: (scope, element) => {
            let store = ConfigFileService.getStore();
            let selfkey = SelfkeyService.dispatchIdAttributeTypes();
            scope.data = store.idAttributes || selfkey.value;
            scope.profile = store.profile;


            scope.openAddEditDialog = function (event, actionType, item, fieldName) {
                $mdDialog.show({
                    controller: EditGeneralInfoDialog,
                    templateUrl: 'common/directives/sk-wallet-edit-general-info-box-dialog.html',
                    parent: angular.element(document.body),
                    targetEvent: event,
                    clickOutsideToClose: false,
                    fullscreen: true,
                    locals: {
                        config: {
                            fieldName: fieldName,
                            title: fieldName == 'name' ? 'name' : fieldName == 'email' ? 'email' : fieldName == 'mobile' ? 'mobile' : fieldName == 'country' ? 'country' : 'upload image'
                        },
                        item: angular.copy(item)
                    }
                }).then((respItem) => {

                    if(!fieldName) {
                        store.profile.picture.path = respItem.value;
                        store.profile.picture.fileSize = respItem.size;
                    }

                    if(fieldName == 'name'){
                        store.idAttributes.name.items[item.name.defaultItemId].value = respItem.name;
                    } else if(fieldName == 'email'){
                        store.idAttributes.email.items[item.email.defaultItemId].value = respItem.email;
                    } else if(fieldName == 'country'){
                        store.idAttributes.country_of_residency.items[item.country_of_residency.defaultItemId].value = respItem.country;
                    } else {
                        fieldName = undefined;
                    }


                    ConfigFileService.save().then((resp) => {
                        // show message
                        if (scope.config && scope.config.callback && scope.config.callback.itemChanged) {
                            scope.config.callback.itemChanged(scope.data);
                        }

                    });
                });
            };
            scope.$on("pos-event", function(event, data){
                store.profile.picture.position.y = data.position.y;
                store.profile.picture.position.x = data.position.x;
            });
        },
        replace: true,
        templateUrl: 'common/directives/sk-wallet-general-info-box.html'
    }
}

export default SkWalletGeneralInfoBoxDirective;