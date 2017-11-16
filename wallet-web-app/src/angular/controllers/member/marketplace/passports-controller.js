function MarketplacePassportsController($rootScope, $scope, $log, $mdDialog, MarketplaceSyncService) {
    'ngInject'

    $log.info('MarketplacePassportsController');

    MarketplaceSyncService.fetch('passports').then((data) => {
        console.log(data);
        $scope.data = data.Data.filter((d) => d.data.fields['show in passport app']);
    });

    


};

export default MarketplacePassportsController;