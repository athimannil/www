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
		$scope.selected 	= [];
		$scope.selectedmode = null;
		$scope.highlighted	= [];


		//Check if old save data exists 
		if(localStorage.getItem('saveSession')){
			var saveSession		= angular.fromJson(localStorage.getItem('saveSession'));
			$scope.categories	= saveSession.categories;
			
			for (var i = 0; i < saveSession.categories.length; i++) {
				if(saveSession.categories[i].selected === true){
					$scope.selected.push(saveSession.categories[i]);
				}
			}
			//Some more modification needed here to add to next column

		}else{

			$http.get('./data.json').then(function(res){
				$scope.categories = res.data.categories;
			});	
		}

		$scope.movetorelated = function(section, $index) {
			$scope.selected.push(section);
			var e 		= $scope.categories[$index];
			e.selected	= !e.selected;
			e.ticked 	= false;
		};

		$scope.categoryChange = function (argument,$index) {
			$scope.categories[$index].ticked = argument;			
		};

		$scope.saveSelection = function(){			
			var saveSession			= new Object();
			saveSession.categories	= $scope.categories;

			localStorage.setItem('saveSession', angular.toJson(saveSession));
		};

		$scope.highlight = function($index ){
				$scope.highlighted[$index] =  $index;
				console.log($scope.highlighted + ' ' +$index);
		};
	});
})();