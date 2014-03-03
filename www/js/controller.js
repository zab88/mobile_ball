'use strict';

function HomeController($scope){
}
function MatchesController($scope,$http){
	$.ajax({
		url:'http://oball.ru/mobile/get_tournament',
		type:'GET',
		dataType:"jsonp",
		data: {
			trn_id: 4309
		},
		success: function( response ) {
			console.log( response );
			var games = response.games,
				teams = response.teams,
				tournament = response.tournament;
			var tableGames = '<table class="table table-bordered">';
			tableGames += '<tr>';
			tableGames += '<th>Id</th>'
			tableGames += '<th>Time</th>'
			tableGames += '<th>Place</th>'
			tableGames += '<th>S1</th>'
			tableGames += '<th>S2</th>'
			tableGames += '<th>Status</th>'
			tableGames += '<th>Teame1</th>'
			tableGames += '<th>Teame2</th>'
			tableGames += '</tr>';
			for(var i = 0; i < games.length; i++){
				tableGames += '<tr>';
				tableGames += '<td>' + games[i]['id'] + '</td>';
				tableGames += '<td>' + games[i].date_time + '</td>';
				tableGames += '<td>' + games[i].place + '</td>';
				tableGames += '<td>' + games[i].s1 + '</td>';
				tableGames += '<td>' + games[i].s2 + '</td>';
				tableGames += '<td>' + games[i]['status'] + '</td>';
				tableGames += '<td>' + games[i].team1 + '</td>';
				tableGames += '<td>' + games[i].team2 + '</td>';
				tableGames += '</tr>';
			}
			tableGames += '</table>';
			$('#games').append(tableGames);
			tableGames = '<table class="table table-bordered">';
			tableGames += '<tr>';
			tableGames += '<th>Id</th>';
			tableGames += '<th>Name</th>';
			tableGames += '</tr>';
			for(var i = 0; i < teams.length; i++){
				tableGames += '<tr>';
				tableGames += '<td>' + teams[i]['id'] + '</td>';
				tableGames += '<td>' + teams[i]['name']+ '</td>';
				tableGames += '</tr>';
			}
			tableGames += '</table>';
			$('#teams').append(tableGames);

		},
		error: (function(response) {
			console.log('error');
			console.log(response);
		}),
		complete: (function(response) {
			console.log('complete');
//			console.log(response);
		})
	});
}
function TimetableController($scope){

}
function TournamentController($scope){

}
