'use strict';
var app = angular.module('ngView', ['ngRoute','ngMobile']);
	app.config(['$routeProvider',
	function($routeProvider, $localProvider){
		$routeProvider
			.when('/matches/:id',{ templateUrl:'pages/matches.html', controller: MatchesController })
			.when('/timetable/',{ templateUrl:'pages/timetable.html', controller: TimetableController })
			.when('/tournament/',{ templateUrl:'pages/tournaments.html', controller: TournamentController })
			.when('/',{ templateUrl:'pages/home.html', controller: HomeController });
		$routeProvider.otherwise({redirectTo: '/'});
//		$localProvider.html5Mode(true);
	}]);