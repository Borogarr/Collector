(function() {
	'use strict';
	
	var moduleName = 'app.collection.edit',
	
		angularDependencies = [
			'ui.router',
			'ui.bootstrap',
			'app.collection.collectionServer',
			// fill in
			];
	
	define([
		'angular',
		'ui.router',
		'ui.bootstrap',
		'app.collection.collectionServer'
		], function(angular) {
			
			var module = angular.module(moduleName, angularDependencies);
			
			module.config(['$stateProvider',
				function($stateProvider) {
					
					$stateProvider.state('app.collection.edit', {
						controller: 'collectionEditController',
						url: ':collectionId/editCollection',
						templateUrl: 'user/collections/collection_edit.html',
						resolve: {
						'collection': ['collectionServer', '$stateParams',
								function(collectionServer, $stateParams) {
									return collectionServer.get($stateParams.collectionId).then(function(response) {
										return response.data;
									});
								}
							]
						}
					});
				}
			]);
			
			module.controller('collectionEditController', ['$scope', '$state', 'collectionServer', 'collection',
				function($scope,$state,collectionServer,collection) {
					console.log('collectionEditController');
					
					$scope.feedback = {
						hasFeedback: false,
						message: null,
						status: null
					};
					
					function reset() {
						_.forEach($scope.collection, function(collection, index) {
							$scope.collection[index] = null;
						});
					}
					
					$scope.collection = collection;
					console.log($scope.collection);
					
					$scope.saveCollection = function() {
						console.log('adding collection...');
						
						collectionServer.update($scope.collection).then(
							function success(response) {
								reset();
								console.log(response);
									$scope.setFeedback(true, 'success', 'Success!');
									$state.reload();
							},
							
							function error(response) {
								console.log(response);
									$scope.setFeedback(true, 'danger', response);
							}
						);
						
					};
						
					$scope.setFeedback = function(hasFeedback, status, message) {
						$scope.feedback.hadFeedback = hasFeedback;
						$scope.feedback.status = status;
						$scope.feedback.message = message;
					};
					
				
				}
			]);
			
			return module;
		});
	
	
})();