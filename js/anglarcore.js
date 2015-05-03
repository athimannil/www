(function(){
	var app = angular.module('keywordApp', []);
	/*app.controller('keywordController', function($scope){
		$scope.related = [];
		$scope.categories = [
			{id: "1", name: "home" },
			{id: "2", name: "office" },
			{id: "3", name: "mangaTholi" },
			{id: "4", name: "ThengaKola" }		
		];	
	});*/

	app.controller('keywordController', function($scope, $http) {
		$scope.selected = [];
		$scope.selectedmode = null;
		$http.get('./data.json').then(function(res){
			$scope.categories = res.data.categories;                
        });

		$scope.movetorelated = function(section, $index) {
		   $scope.selected.push(section);
	        var e = $scope.categories[$index];
	        e.selected = !e.selected;
	        e.ticked = true;
		};

		$scope.categoryChange = function (argument) {
			console.log(argument);
		};
	});

})();