'use strict';

function MarketplaceSyncService($rootScope, $log, $q, $http, CONFIG, localStorageService) {
    'ngInject';

    $log.debug('MarketplaceSyncService Initialized');
    const BASE_URL = 'https://alpha.selfkey.org/marketplace/i/api/';

    // Naive cache for development purposes
    let CACHE = window.sessionStorage;

    class MarketplaceSync {

        fetch (table) {
            const cache_data = CACHE.getItem(table);

            if (cache_data) {
                console.log("Returning data from cache", table);
                return new Promise((resolve, reject) => resolve(JSON.parse(cache_data)));
            }

            const apiURL = "https://alpha.selfkey.org/marketplace/i/api/" + table;
            console.log(apiURL);

            return new Promise((resolve, reject) => {
                $http.get(apiURL)
                .then((response) => {
                    console.log(apiURL, response); 
                    return response;
                })
                .then((data) => {
                    CACHE.setItem(table, JSON.stringify(data.data));
                    resolve(data.data);
                })
                .catch((error) => reject(error));
            });
        }
    }

    return new MarketplaceSync();

  
}



export default MarketplaceSyncService;