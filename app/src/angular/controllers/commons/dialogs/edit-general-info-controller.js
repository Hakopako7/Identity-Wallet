function EditGeneralInfoDialog($rootScope, $scope, $log, $mdDialog, ElectronService, config) {
    'ngInject';

    $log.info('EditGeneralInfoDialog');

    $scope.item = {};
    $scope.config = config;

    $scope.selectFile = (event) => {
        console.log('image-event', event)
        let promise = ElectronService.openFileSelectDialog(event);
        promise.then((resp) => {
            console.log('imageee', resp);
            if (resp && resp.path) {
                $scope.item.value = resp.path;
                $scope.item.contentType = resp.mimeType;
                $scope.item.size = resp.size;
            }
        });
    };

    $scope.save = () => {
        console.log('saveeeeeeeee', $scope.item);
        if ($scope.item) {
            $mdDialog.hide($scope.item);
        }
    };

    $scope.cancel = () => {
        $mdDialog.cancel();
    }
}

export default EditGeneralInfoDialog;











