(function() {
	'use strict';
	
	var moduleName = 'app.item.editServer',
	
		angularDependencies = [];
	
	define([
		'angular'
		], function(angular) {
		
			var module = angular.module(moduleName, angularDependencies);
			
			module.factory('editServer', ['$http',
				function($http) {
					var editServer = {};
					
					editServer.get = function(id) {
						id = id || '';
						return $http.get('/api/items/' + id);
					};
					
					editServer.create = function(item) {
						return $http.post('/api/item/', item);
					};
					
					editServer.update = function(item) {
						return $http.post('/api/item/' + item._id, item);
					};
					
					editServer.delete = function(id) {
						return $http.delete('/api/item/' + id);
					};
					/*
					itemServer.addPic = function(uploadFile) {
						return $http.post('/api/upload/', uploadFile);
					};*/
					
					return editServer;
				
					
					
					}
				]);
			
			return module;
			
			});
		
	
})();