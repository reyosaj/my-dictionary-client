/**
 * @author reyos
 */
var app = angular.module('DictionaryApp', ['ngRoute']); /* 'ui.bootstrap'*/

app.config(function ($routeProvider) {
	$routeProvider.when('/search', 
	{
		controller: 'SearchController',
		templateUrl: 'views/Search.html'
	})
	.when('/addWord', 
	{
		controller: 'AddWordController',
		templateUrl: 'views/AddWord.html'
	})
	.when('/words',
	{
		controller: 'WordsListController',
		templateUrl: 'views/Words.html'
	})
	.when('/wordDetails/:selectedWord', 
	{
		controller: 'WordDetailController',
		templateUrl: 'views/WordDetails.html'
	});
	/*.otherwise({redirectTo: "/search"});*/
	
});

app.factory('appCache', function($cacheFactory){
	return $cacheFactory('dictionary');
});


$("document").ready(function(){
    $("#ttsearch").typeahead({
        ajax : {
        	url:'http://localhost:8080/dictionary-app/dictionary' + $("#ttsearch").val(),
        	preProcess : function(data){
        		var scope = angular.element(document.getElementById('ttsearch')).scope();
        		scope.cacheResponse(data);
        		return data.matches;
        	},
        	preDispatch : function(query) {
        		return 'search=' + query;
        	}
        },
      /*displayField: 'matches',*/
        onSelect : function(val){
        	var scope = angular.element(document.getElementById('ttsearch')).scope();
        	scope.loadSearchDetailsPartial(val.text);
        }
    });
});






