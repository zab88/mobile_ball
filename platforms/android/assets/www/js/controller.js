'use strict';

function HomeController($scope){
}
function MatchesController($scope,$routeParams){
	if($routeParams.id){
		$.ajax({
			url:'http://oball.ru/mobile/get_tournament',
			type:'GET',
			dataType:"jsonp",
			data: {
				trn_id: $routeParams.id
			},
			success: function( response ) {
				if(!response.error){
					var games = response.games,
						teams = response.teams,
						tournament = response.tournament;
					/*
					 * input games
					 * */
					if(games){
						var tableGames = '<h3>Games</h3>';
						tableGames += '<table class="table table-bordered">';
						tableGames += '<tr>';
						tableGames += '<th>Id</th>';
						tableGames += '<th>Time</th>';
						tableGames += '<th>Place</th>';
						tableGames += '<th>S1</th>';
						tableGames += '<th>S2</th>';
						tableGames += '<th>Status</th>';
						tableGames += '<th>Teame1</th>';
						tableGames += '<th>Teame2</th>';
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
					}
					$('#games').append(tableGames);
					/*
					 * input Teams
					 * */
					if(teams){
						tableGames = '<h3>Teams</h3>';
						tableGames += '<table class="table table-bordered">';
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
					}
					/*
					 * input Tournament
					 * */
					if(tournament){
						tableGames ='<h3>Tournament</h3>';
						tableGames += '<table class="table table-bordered">';
						tableGames += '<tr>';
						tableGames += '<th>Id</th>';
						tableGames += '<th>Name</th>';
						tableGames += '<th>Description</th>';
						tableGames += '<th>Rating</th>';
						tableGames += '</tr>';
						tableGames += '<tr>';
						tableGames += '<td>' + tournament['t_id'] + '</td>';
						tableGames += '<td>' + tournament.t_name + '</td>';
						tableGames += '<td>' + tournament.t_description + '</td>';
						tableGames += '<td>' + tournament.t_rating + '</td>';
						tableGames += '</tr>';
						tableGames +='</table>';
						/*
						 * params tournament
						 * */
						var params = JSON.parse(tournament.t_params);
						tableGames +='<h4>Params</h4>';
						tableGames += '<table class="table table-bordered">';
						tableGames += '<tr>';
						tableGames += '<th>Win points</th>';
						tableGames += '<th>Draw points</th>';
						tableGames += '<th>Lose points</th>';
						tableGames += '<th>Team num</th>';
						tableGames += '<th>Num rounds</th>';
						tableGames += '</tr>';
						tableGames += '<tr>';
						tableGames += '<td>' + params['win_points'] + '</td>';
						tableGames += '<td>' + params.draw_points + '</td>';
						tableGames += '<td>' + params.lose_points + '</td>';
						tableGames += '<td>' + params.team_num + '</td>';
						tableGames += '<td>' + params.num_rounds + '</td>';
						tableGames += '</tr>';
						tableGames +='</table>';
						$('#tournament').append(tableGames);
					}

				}else{
					$('#error').empty().removeClass('hidden').append('This tournament is no');
				}


			},
			error: (function(response) {
				console.log('error');

			}),
			complete: (function(response) {
				console.log('complete');
			})
		});
	}
}
function TimetableController($scope){

}
function TournamentController($scope){
	$scope.searchItem = function(){
		$.ajax({
			url:'http://oball.ru/mobile/get_tournaments',
				type:'GET',
				dataType:"jsonp",
				data: {
					q: $scope.search
				},
			success: function(response){
				if(response != ''){
					var list = '<ul class="nav">';
					for(var i = 0; i < response.length; i++){
						list += '<li><a href="#/matches/'+response[i].t_id+'">'+
							'<h5>'+response[i].t_name+'</h5>'+
							'<div>'+response[i].t_description+'</div>'+
							'</a></li>';
					}
					list += '</ul>';
					$('#response').empty();
					$('#error').empty().addClass('hidden');
					$('#response').append(list);
				}else{
					$('#response').empty();
					$('#error').empty().removeClass('hidden').append('This tournament is no');
				}
			},
			error: function(){
				console.log('error');
			}
			});

	}
}
