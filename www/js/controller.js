'use strict';

var database = window.localStorage;
if(database.length == 0){
	console.log('LocalStorage empty');
}else{
	console.log(database.getItem('tournament'));
//	database.clear();
}
function HomeController($scope){
	(database.getItem('tournament'))? $scope.tournament = JSON.parse(database.getItem('tournament')) : $scope.tournament =[];

}
function MatchesController($scope,$routeParams){
	
	
	var Team = function(name, id){
		this.name = name;
		this.id = id;
		this.score = 0;
		this.diff = 0
	}
	var Game = function(team_h, team_v){
		this.team_h = team_h
		this.team_v = team_v
		this.team1 = null
		this.team2 = null
		this.date_time = ''
		this.place = null
		this.id = 0
		this.round = 0
		this.s1 = 0
		this.s2 = 0
		this.status = 0

		this.set_time = function(date_time){
			this.date_time = date_time;
		}
		this.set_score = function(s1, s2){
			this.s1 = parseInt( s1 );
			this.s2 = parseInt( s2 );
		}
		this.set_id = function(id){
			this.id = id
		}
		this.set_status = function(st){
			this.status = parseInt(st);
		}
		this.render = function(){
			//if game already exists - refresh
			//else add game
			if (this.status > 1){
				var sst = ' alert-success';
			}else{
				var sst = '';
			}
			$('.games_wrap').append('<div class="js_game_'+this.id+sst+' well well-sm" data-id="'+this.id+'">'+
				'<span class="h_team" data-id="'+this.team_h.id+'">'+this.team_h.name + '</span> -- '+
				'<span class="v_team" data-id="'+this.team_v.id+'">'+this.team_v.name + '</span>'+
				' <span class="gg_score">'+this.s1+' '+this.s2+'</span>' +
				//' <span class="gg_date_time badge">'+convert_time(this.date_time)+'</span></div>')
				' <span class="gg_date_time badge">'+(this.date_time)+'</span></div>')
		}
	}
	


	if($routeParams.id){
		$scope.class = 'glyphicon-star-empty';
		$.ajax({
			url:'http://oball.ru/mobile/get_tournament',
			type:'GET',
			dataType:"jsonp",
			data: {
				trn_id: $routeParams.id
			},
			success: function( response ) {
				if(!response.error){
//					console.log(response);
					var games = response.games,
						teams = response.teams,
						tournament = response.tournament;
					$('.t_name').data('name',tournament.t_name).append(tournament['t_name']);
					$('.t_id').val(tournament['t_id']);
					var tableGames;
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
					/*
					 * input Teams
					 * */
					var teams_arr = []
					if(teams){
						for(var i = 0; i < teams.length; i++){
							
							var t = new Team(teams[i]['name'], teams[i]['id'])
							teams_arr.push(t)
						}
					}
					//console.log(teams_arr)
					//ALL GAMES
					/*
					 * input games
					 * */
					var games_generated = []
					for (var i in teams_arr){
						for (var j in teams_arr){
							if (i == j) continue;
							var g = new Game( teams_arr[i], teams_arr[j] )

							//if game already saved on server
							for (var ii in games){
								if (typeof games[ii].team_h !== "undefined" && teams_arr[i].id == games[ii].team_h.id && teams_arr[j].id == games[ii].team_v.id ){
									g.set_time( games[ii].date_time )
									g.set_score( games[ii].s1, games[ii].s2 )
									g.set_id( games[ii].id )
									g.set_status( games[ii].status )
									break;
								}
								//if games saved on server (not initialised yet) team1 = team1_id and team_h, team_v not set
								else if ( teams_arr[i].id == games[ii].team1 && teams_arr[j].id == games[ii].team2 ){
									g.set_time( games[ii].date_time )
									g.set_score( games[ii].s1, games[ii].s2 )
									g.set_id( games[ii].id )
									g.set_status( games[ii].status )
									break;
								}
							}

							g.render()
							games_generated.push( g )
						}
					}
					games = games_generated;
					//sorting games by datetime and status
					$('.games_wrap div').sort(function(a, b){
						var a_datetime = $(a).find('.gg_date_time').text();
						var b_datetime = $(b).find('.gg_date_time').text();
						
						//console.log(a_datetime, b_datetime)
						if (a_datetime > b_datetime){
							return -1;
						}
						else if (a_datetime < b_datetime){
							return 1;
						}
						else{
							return 0;
						}
						
						return a_datetime > b_datetime;
					}).appendTo('.games_wrap')
					
					//sorting teams by place
					function compare_teams(a,b) {
						if ( parseInt(a.score) < parseInt(b.score))
							return -1;
						if (parseInt(a.score) > parseInt(b.score))
							return 1;
						//by difference of points
						if (parseInt(a.diff) < parseInt(b.diff))
							return -1;
						if (parseInt(a.diff) > parseInt(b.diff))
							return 1;
						//second by name
						if (a.name > b.name)
							return -1;
						if (a.name < b.name)
							return 1;
						return 0;
					}
					
					//TABLE
					teams = teams_arr
					
						//1: counting places
						for(var i in games){
							if (games[i].status < 1) {continue;}
							if ( games[i].s1 > games[i].s2 ){
								games[i].team_h.score += parseInt( params.win_points )
								games[i].team_v.score += parseInt( params.lose_points )
								games[i].team_h.diff += (games[i].s1 - games[i].s2)
								games[i].team_v.diff += (games[i].s2 - games[i].s1)
							}else if ( games[i].s1 < games[i].s2 ){
								games[i].team_h.score += parseInt( params.lose_points )
								games[i].team_v.score += parseInt( params.win_points )
								games[i].team_h.diff += (games[i].s1 - games[i].s2)
								games[i].team_v.diff += (games[i].s2 - games[i].s1)
							}else{
								games[i].team_h.score += parseInt( params.draw_points )
								games[i].team_v.score += parseInt( params.draw_points )
							}
						}

						//2: sorting in case of place
						teams.sort(compare_teams).reverse()

						//3: generating html
						
						var html = '';
						var team_place = 1;
						//header
						html += '<tr><th>Teams</th>';
						/*
						for (var j in teams){
							html += '<th>'+teams[j].name.substr(0, 4)+'...</th>'
						}*/
						html += '<th>Score</th>'
						html += '<th>Place</th>'
						html += '</tr>';

						//body
						for (var i in teams){
							html += '<tr><th>'+teams[i].name+'</th>';
							/*for (var j in teams){
								if (i == j){
									html += '<td style="background-color: #f2f2f2"></td>';
									continue;
								}
								html += '<td>';
								for (var k in games){
									//html += make_cell(games[k], teams[i], teams[j])
									html += '';
								}
								html += '</td>';
							}*/
							html += '<td>'+teams[i].score+'</td>'
							html += '<td>'+team_place+'</td>'
							html += '</tr>';
							team_place++;
						}
						html = '<table class="table table-bordered table-hover">'+
							html+
							'</table>';
						$('.table_wrap').html(html)
			},
			error: (function(response) {
				console.log('error');

			}),
			complete: (function(response) {
				console.log('complete');

			})
		});
		var arr;
		(database.getItem('tournament'))? arr = JSON.parse(database.getItem('tournament')) : arr = [];
		var flag = 0;
		if(arr){
			if(in_array($routeParams.id,arr)){
				$scope.class = 'glyphicon-star';
				flag = 1;
			}
		}
		$scope.AddStory = function(){
			var id = $('.t_id').val(),
				name = $('.t_name').data('name');
			if(!flag){
				arr.push(
					{ id : id, name: name}
				)
				database.setItem('tournament', JSON.stringify(arr));
				$scope.class = 'glyphicon-star';
				flag = 1;
			}else{
				var deleteElem = null;
				for(var i = 0; i < arr.length; i++){
					if($routeParams.id == arr[i].id){
						deleteElem = i;
					}
				}
				arr.splice(deleteElem,1);
				flag = 0;
				database.setItem('tournament', JSON.stringify(arr));
				$scope.class = 'glyphicon-star-empty';
			}

		}

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
				if(!response.error){
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
					$('#error').empty().removeClass('hidden').append(response.error_message);
				}
			},
			error: function(){
				console.log('error');
			}
			});

	}
}
function in_array(id, arr){
	for(var i = 0; i < arr.length; i++){
		if(id == arr[i].id){
			return true;
		}
	}
	return false;
}