(function () {
	"use strict";

	angular.module('common')
	.service('MenuService', MenuService);


	MenuService.$inject = ['$http', 'ApiPath'];
	function MenuService($http, ApiPath) {
		var service = this;
		var confirmedUser=[];
		var items=[];
		service.getCategories = function () {
			return $http.get(ApiPath + '/categories.json').then(function (response) {
				return response.data;
			});
		};


		service.getMenuItems = function (category) {
			var config = {};
			if (category) {
				config.params = {'category': category};
			}

			return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
				return response.data;
			});
		};

		service.saveFromSubmit=function(userFirstName,userLastName,userEmail,userPhone,userShortName){
			return $http({method: "GET",url: (ApiPath + "/menu_items/"+userShortName+".json")}).then(function (response) {
				var user= { 
					     firstName:userFirstName, 
					     lastName:userLastName, 
					     email:userEmail, 
					     phone:userPhone, 
					     shortName:userShortName,
					     item:response.data
					   }; 
				confirmedUser.push(user);
				return true;
			});


		};
		
		service.getConfirmedUser=function(){
			return confirmedUser;
		};
		

	}



})();
