function MarketplacePassportsController($rootScope, $scope, $log, $mdDialog, $state, MarketplaceSyncService) {
    'ngInject'

    $log.info('MarketplacePassportsController');

    MarketplaceSyncService.fetch('passports').then((data) => {
        console.log(data);
        $scope.data = data.Data.filter((d) => d.data.fields['show in passport app']);
	});
	
	$scope.showDetailView = function(p) {
		console.log(p);
		$state.go('member.marketplace.passports-detail', { data: p });
	}

}

function MarketplacePassportsDetailController($rootScope, $scope, $log, $stateParams) {
	'ngInject'

	$log.info('MarketplacePassportsDetailController');

	$scope.data = $stateParams.data.data.fields;
	
	$log.info($scope.data);
	
}

export { MarketplacePassportsController, MarketplacePassportsDetailController };