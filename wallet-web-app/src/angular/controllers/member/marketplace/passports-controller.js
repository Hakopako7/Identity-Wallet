function MarketplacePassportsController($rootScope, $scope, $log, $mdDialog, $state, MarketplaceSyncService) {
    'ngInject'

    $log.info('MarketplacePassportsController');

    MarketplaceSyncService.fetch('passports').then((data) => {
        console.log(data);
        $scope.data = data.Data.filter((d) => d.data.fields['show in passport app']);
	});
	
	$scope.showDetailView = function(p) {
		console.log(p);
		$state.go('member.marketplace.passports-detail', { data: p }, {reload:false});
	}

}

function MarketplacePassportsDetailController($rootScope, $scope, $log, $mdDialog, $state) {
	'ngInject'

	$log.info('MarketplacePassportsDetailController');
	
	
}

export { MarketplacePassportsController, MarketplacePassportsDetailController };