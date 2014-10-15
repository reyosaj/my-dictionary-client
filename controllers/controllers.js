/**
 * @author reyos
 */

app.controller('SearchController', ['$scope', '$http', '$location','appCache', function($scope, $http, $location, appCache){
	
	$scope.cacheResponse = function(data){
		appCache.put('dictionary', data);
	};
	
	$scope.loadSearchDetailsPartial = function(selectedWrd){
		$location.path("/wordDetails/" + selectedWrd);
		$scope.$apply();
	};
	

}]);


app.controller('WordDetailController', ['$scope', '$routeParams', 'appCache', '$http', function($scope, $routeParams, appCache, $http) {
	$http({
		method : 'GET',
		url : 'http://localhost:8080/dictionary-app/dictionary/' + $routeParams.selectedWord
	}).success(function(data, status, headers, config){
		$scope.Word = data.word;
		$scope.Meaning = data.usage[0];
	}).error(function(data, status, headers, config){
		console.log("WordDetailController error data: " + JSON.stringify(data));
		console.log("WordDetailController error status: " + status);
		console.log("WordDetailController error headers: " + headers);
	});
}]);


app.controller('AddWordController', ['$scope', 'appCache', '$http', function($scope, appCache, $http) {

	$scope.addWord = function() {
		var newEntry = {};
		newEntry.word = $scope.newWord;
		newEntry.usage = new Array();
		newEntry.usage.push($scope.newWordMeaning);
		
		console.log("new entry : " + JSON.stringify(newEntry));
		
		$http({
		method : 'PUT',
		url : 'http://localhost:8080/dictionary-app/dictionary/' + $scope.newWord,
		data : newEntry,
		}).success(function(data, status, headers, config){
			console.log("WordDetailController success data: " + JSON.stringify(data));
			console.log("WordDetailController success status: " + status);
		}).error(function(data, status, headers, config){
			console.log("WordDetailController error data: " + JSON.stringify(data));
			console.log("WordDetailController error status: " + status);
			console.log("WordDetailController error headers: " + headers);
		});
	};

}]); 


app.controller('WordsListController', ['$scope', '$http', function($scope, $http){
	
}]);
