(function() {
	'use strict';
	
	var moduleName = 'app.user.edit',
	
		angularDependencies = [
			'ui.router',
			'ui.bootstrap',
			'app.user.userServer',
			'app.user.editUserServer'
			// fill in
			];
	
	define([
		'angular',
		'ui.router',
		'ui.bootstrap',
		'app.user.editUserServer',
		'app.user.userServer'
		], function(angular) {
			
			var module = angular.module(moduleName, angularDependencies);
			
			module.config(['$stateProvider',
				function($stateProvider) {
					
					$stateProvider.state('app.user.edit', {
						controller: 'userEditController',
						url: '/:userId/editUser',
						templateUrl: 'user/user_edit.html',
						resolve: {
						'userId': ['userServer', '$stateParams',
								function(userServer, $stateParams) {
									return userServer.get($stateParams.userId).then(function(response) {
										return response.data;
									});
								}
							]
						}
					});
				}
			]);
			
			module.controller('userEditController', ['$scope', '$state', 'userServer', 'userId', 'editUserServer',
				function($scope,$state,userServer,userId,editUserServer) {
					console.log('userEditController');
					
					$scope.feedback = {
						hasFeedback: false,
						message: null,
						status: null
					};
					
					function reset() {
						_.forEach($scope.user, function(user, index) {
							$scope.user[index] = null;
						});
					}
					
					$scope.user = userId;
					console.log($scope.user);
					
					$scope.saveUser = function() {
						console.log('adding user...');
					
						userServer.update($scope.user).then(
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