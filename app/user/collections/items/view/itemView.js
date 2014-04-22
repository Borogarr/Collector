(function() {
	'use strict';
	
	var moduleName = 'app.item.view',
	
	angularDependencies = [
		'ui.router',
		'ui.bootstrap',
		'app.item.new',
		'app.item.editServer',
		'app.item'
		// fill in dependencies later
		];
	
	define([
		'angular',
		'ui.router',
		'ui.bootstrap',
		'app.item.new',
		'app.item',
		'app.item.editServer'
		// fill in as they come
		], function(angular) {
			var module = angular.module(moduleName, angularDependencies);
			
			module.config(['$stateProvider',
				function($stateProvider) {
					
					$stateProvider.state('app.item.view', {
						controller: 'itemViewController',
						url: ':itemId/view',
						templateUrl: 'user/collections/items/item_view.html',
						resolve: {
							'item': ['itemServer',
								function(itemServer) {
									return itemServer.get();
								}
							],
							'itemview': ['editServer', '$stateParams',
								function(editServer, $stateParams) {
									return editServer.get($stateParams.itemId).then(function(response) {
										return response.data;
									});
								}
							],
							'collectionId': ['$stateParams', 'collectionServer',
								function($stateParams, collectionServer) {
									return collectionServer.get($stateParams.collectionId).then(function(response) {
										return response.data;
									});
								}
							]
						}
					});
				}
			]);
			
			module.controller('itemViewController', ['$scope','$state','itemServer','item','collectionId','itemview',
				function($scope,$state,itemServer,item,collectionId,itemview) {
					console.log('itemViewController', item);
					console.log(collectionId);
					console.log(itemview);
					
					//add functionality here
					$scope.view = itemview.data;
					$scope.collectionId = collectionId._id;
					console.log($scope.view);
					
					
					
					
					$scope.deleteItem = function(id) {
						var index = _.findIndex($scope.item, {
							'_id': id
						});
						
						itemServer.delete(id).then(function(response) {
							console.log(response);
							$scope.item.splice(index,1);
						});
					};
					
					$scope.filterId = function(item) {
						return (item._id == itemview._id);
					}
					
					
					
					}
				]);
			return module;
		});
	
	
})();