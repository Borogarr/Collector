(function() {
	'use strict';
	
	var moduleName = 'app.user.editUserServer',
	
		angularDependencies = [];
	
	define([
		'angular'
		], function(angular) {
		
			var module = angular.module(moduleName, angularDependencies);
			
			module.factory('editUserServer', ['$http',
				function($http) {
					var editUserServer = {};
					
					editUserServer.get = function() {
						id = id || '';
						return $http.get('/api/users/' + id);
					};
					
					editUserServer.create = function(user) {
						return $http.post('/api/user/', user);
					};
					
					editUserServer.update = function(user) {
						return $http.post('/api/user/' + user._id, user);
					};
					
					editUserServer.delete = function(id) {
						return $http.delete('/api/user/' + id);
					};
				
					
					return editUserServer;
				
					
					
					}
				]);
			
			return module;
			
			});
		
	
})();