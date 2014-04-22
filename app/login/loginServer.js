(function() {
	'use strict';
	
	var moduleName = 'app.login.loginServer',
	
		angularDependencies = [];
	
	define([
		'angular'
		], function(angular) {
		
			var module = angular.module(moduleName, angularDependencies);
			
			module.factory('loginServer', ['$http','$q',
				function($http, $q) {
					var loginServer = {};
					
					/*loginServer.get = function(id) {
						id = id || '';
						return $http.get('/api/login/' + id);
					};*/
					
					loginServer.login = function(user) {
							console.log('Hi');
							return $http.post('/api/login/', user);
					};
					
					loginServer.create = function(login) {
						return $http.post('/api/user/', login);
					};
					
					loginServer.update = function(login) {
						return $http.post('/api/login/' + login._id, login);
					};
					
					loginServer.delete = function(id) {
						return $http.delete('/api/login/' + id);
					};
					/*
					itemServer.addPic = function(uploadFile) {
						return $http.post('/api/upload/', uploadFile);
					};*/
					
					return loginServer;
				
					
					
					}
				]);
			
			return module;
			
			});
		
	
})();