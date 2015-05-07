(function(){
	var app = angular.module('keywordApp', []);


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

			if(typeof $scope.highlighted[$index] === 'undefined')				
				$scope.highlighted[$index] =  $index;
			else
				delete $scope.highlighted[$index];			
		};

		$scope.moveFirst = function(){
			// console.log('To first');

			for (var i = 0; i < $scope.highlighted.length; i++) {
				if(typeof $scope.highlighted[i] !== 'undefined' && $scope.highlighted[i]!== 0){
					
					//Move upto 0
					for(var j = $scope.highlighted[i] ;j>0 ; j--){
							console.log('working');
						swapObject($scope.highlighted[j], $scope.highlighted[j]-1);
						// remove old position of highlighted element
						delete $scope.highlighted[j];
						$scope.highlighted[j-1] = j-1;
					}				
				}
			};
			
		}

		$scope.moveUp = function(){
			// console.log('up');

			for (var i = 0; i < $scope.highlighted.length; i++) {
				if(typeof $scope.highlighted[i] !== 'undefined' && $scope.highlighted[i] !== 0){
					swapObject($scope.highlighted[i], $scope.highlighted[i]-1);
					
					// remove old position of highlighted element
					delete $scope.highlighted[i];
					$scope.highlighted[i-1] = i-1;
				}
			};
		}

		$scope.moveDown = function(){
			// console.log('down');		

			var total = $scope.highlighted.length;

			for (var i = total; i > -1; i--) {
			
				if(typeof $scope.highlighted[i] !== 'undefined' && $scope.selected.length !== i)
				{
					swapObject($scope.highlighted[i], $scope.highlighted[i]+1);					
					// remove old position of highlighted element
					delete $scope.highlighted[i];
					$scope.highlighted[i+1] = i+1;
				}
			};
			
		}

		$scope.moveLast = function(){
		 // console.log('Last');

			var total = $scope.highlighted.length;
			var maxSel = $scope.selected.length;

			for (var i = total; i > -1; i--) {
			
				if(typeof $scope.highlighted[i] !== 'undefined' && maxSel !== i){
					
					//Move down upto last row					
					for(var j = $scope.highlighted[i]; j < maxSel-1; j++){
						swapObject($scope.highlighted[j], $scope.highlighted[j]+1);
						// remove old position of highlighted element
						delete $scope.highlighted[j];
						$scope.highlighted[j+1]= j+1;
					}
				}
			};
		}
		
		function swapObject(from,to){
			// console.log('From:' + from + ' To: ' + to);
			var temp 	= new Object;
			
			temp 					= $scope.selected[from];
			$scope.selected[from] 	= $scope.selected[to];
			$scope.selected[to] 	= temp;
		}
	});
})();