'use strict';

describe('WordDetailController', function() {
	var scope;

	beforeEach(angular.mock.module('DictionaryApp'));

	beforeEach(angular.mock.inject(function($rootScope, $controller) {
		scope = $rootScope.$new();
		$controller('WordDetailController', {
			$scope : scope
		});
	}));

	it('should get word details', inject(function($httpBackend) {
		$httpBackend.expect('GET', 'http://localhost:8080/dictionary-app/dictionary/ashes').respond(200, "{word: 'ashes', usage: ['residue']}");
		
		$httpBackend.flush();
		expect(scope.Word).toBe('ashes');
		expect(scope.Meaning).toBe('residue');
	}));

});
