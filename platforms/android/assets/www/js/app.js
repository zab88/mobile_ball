'use strict';
var app = angular.module('ngView', ['ngRoute']);
	app.config(['$routeProvider',
	function($routeProvider, $localProvider){
		$routeProvider
			.when('/matches/',{ templateUrl:'/pages/matches.html', controller: MatchesController })
			.when('/timetable/',{ templateUrl:'/pages/timetable.html', controller: TimetableController })
			.when('/tournament/',{ templateUrl:'/pages/tournaments.html', controller: TournamentController })
			.when('/',{ templateUrl:'/pages/home.html', controller: HomeController });
//		$localProvider.html5Mode(true);
	}]);