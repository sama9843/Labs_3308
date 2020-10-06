/*
	players is an array to hold each player's information.
	Fields:
		name - Football player's name
		img  - The relative/absolute path to the image file.
		alt  - The alternative text that describes the image.
		year - The student's year in college (Freshman, Sophomore, Junior, Senior).
		major- The student's current college major.
		games_played    - The number of football games the student has played for the Buffs.
		pass_yards      - The total number of passing yards in the student's football career for the Buffs.
		rushing_yards   - The total number of rushing yards in the student's football career for the Buffs.
		receiving_yards - The total number of receiving yards in the student's football career for the Buffs.
*/
var players = [{name:"John Doe", img: "../resources/img/player1.jpg", alt:"Image of Player 1", year:"Sophomore", major:"Art", games_played: 23, pass_yards: 435, rushing_yards: 200, receiving_yards: 88},
				{name:"James Smith", img: "../resources/img/player2.jpg", alt:"Image of Player 2", year:"Junior", major:"Science", games_played: 17, pass_yards: 192, rushing_yards: 102, receiving_yards: 344},
				{name:"Samuel Phillips", img: "../resources/img/player3.jpg", alt:"Image of Player 3", year:"Freshman", major:"Math", games_played: 8, pass_yards: 35, rushing_yards: 70, receiving_yards: 98},
				{name:"Robert Myers", img: "../resources/img/player4.jpg", alt:"Image of Player 4", year:"Senior", major:"Computer Science", games_played: 31, pass_yards: 802, rushing_yards: 375, receiving_yards: 128}];


/*
	Registration Page:
		viewStudentStats(id, toggle) method
			parameters:
				id - The css id of the html tag being updated.
				toggle - 
					0 - hide the html tag
					1 - make the html tag visible
			
			purpose: This method will accept the id of an html tag and a toggle value.
					 The method will then set the html tag's css visibility and height.  
					 To hide the html tag (toggle - 0), the visibility will be set to hidden and
					 the height will be set to 0.  
					 To reveal the html tag (toggle - 1), the visibility will be set to visible and
					 the height will be set to auto.
*/
function viewStudentStats(id, toggle)
{
	var x = document.getElementById(id);
	var y = document.getElementById('undergrad_select');
	var z = document.getElementById('grad_select');
	if(id == 'student_status')
	{
		if(toggle == 1)
		{
			x.style.visibility = "visible";
			x.style.height = "auto";
		}
		else{
			x.style.visibility = "hidden";
			x.style.height = "0";
			z.style.visibility = "hidden";
			y.style.visibility = "hidden";
		}
	}
	else{
		if(toggle == 0)
		{
			z.style.visibility = "hidden";
			y.style.visibility = "visible";
			y.style.height = "0";
			z.style.height = "auto";
		}
		else{
			y.style.visibility = "hidden";
			z.style.visibility = "visible";
			z.style.height = "0";
			y.style.height = "auto";
		}
	}
}
				
/*
	Home Page: 
		changeColor(color) method
			parameter: 
				color- A css color
				
			purpose: This method will set the html body's background color to the 
					 provided parameter.
*/
function changeColor(color)
{
	document.body.style.background = color;
}

/*
	Football Season Stats Page:
		loadStatsPage method:
			parameters: none
			
			purpose: This method will iterate through the stats table and 
					 do the following:
						1. Read through each row of the table & determine which team won
						   the game.
						
						2. Update the winner column to the name of the winning team.
						
						3. Keep track of the number of wins/losses for the Buffs.
						
						4. Update the second table to show the total number of wins/losses for the Buffs.
*/
function loadStatsPage()
{
	var table = document.getElementById('stats_table');
	var row_counter;
	var col_counter;
	var cell_value;
	var value1 = null;
	var value2 = null;
	var wins = 0;
	var losses = 0;
	for(row_counter = 2; row_counter < table.rows.length; row_counter++)
	{
		for(col_counter = 0; col_counter < table.rows[row_counter].cells.length; col_counter++)
		{
			cell_value = parseInt(table.rows[row_counter].cells[col_counter].innerHTML);
			if(col_counter == 2)
			{
				value1 = cell_value;
			}
			else if(col_counter == 3)
			{
				value2 = cell_value;
			}
			else if(col_counter == 4){
				if (value1 > value2)
				{
					table.rows[row_counter].cells[col_counter].innerHTML = "CU Boulder";
					wins++;
				}
				else{
					table.rows[row_counter].cells[col_counter].innerHTML = table.rows[row_counter].cells[1].innerHTML;
					losses++;
				}
			}
		}
	}
	document.getElementById('wins').innerHTML = wins;
	document.getElementById('losses').innerHTML = losses;
}
/*
	Football Player Information Page
		loadPlayersPage method:
			parameters: none
			
			purpose: This method will populate the dropdown menu to allow the 
					 user to select which player's information to view.
					 
					 To handle this, you will need to iterate through the players array
					 and do the following for each player:
						1. Create an anchor tag
						2. Set the href to "#", this will make sure the 
							anchor tag doesn't change pages
						3. Set the onclick to call switchPlayers method 
							(this will need to pass in the index inside the players array)
						4. Set the anchor tag's text to the player's name.
						
					After setting all of the anchor tags, update the innerHTML of the dropdown menu.
					As a note, the id for the dropdown menu is player_selector.
		
		switchPlayers(playerNum) method:
			parameters: 
				playerNum - The index of the football player in the players array.
			
			purpose:
				This method will update the the spans on the player's information pageX
				and calculate the average passing, rushing, and receiving yards.
				
				Span ids:
					p_year     - the player's year in college
					p_major    - the player's major in college
					g_played   - the number of games played for Buffs
					player_img - the player's photo (must set src and alt)
					p_yards    - the number of passing yards
					r_yards    - the number of rushing yards
					rec_yards  - the number of receiving yards
					
					Calculated values:
					  avg_p_yards   - the average number of passing yards for the player's Buff career
					  avg_r_yards   - the average number of rushing yards for the player's Buff career
					  avg_rec_yards - the average number of receiving yards for the player's Buff career
*/
function loadPlayersPage()
{
	players = [{player_name: 'John Smith'},
			{player_name: 'James Smith'},
			{player_name: 'Samuel Philips'},
			{player_name: 'Robert Myers'}];
	var select = document.getElementById("player_selector");
	var playerInfo ="";
	for(var i = 0; i < 4; i++)
	{
		var n = players[i].player_name;
		playerInfo +="<a class = 'dropdown-item' href='#' onclick = 'switchPlayers("+ i +")'> "+ n +"</a>";
	}
	select.innerHTML = playerInfo;
}


function switchPlayers(playerNum)
{
	info = [{p_year:'Sophmore', p_major:'Art',g_played:'23',player_img:"https://i.pinimg.com/originals/ac/a2/dc/aca2dcf518c1a97217542facfe89eb77.jpg",img_alt:"First Player Image",p_yards:'435',r_yards:'200',rec_yards:'88'},
	{p_year:'Junior', p_major:'Science',g_played:'17',player_img:"https://cdn3.vectorstock.com/i/1000x1000/36/87/boy-football-player-cartoon-vector-2973687.jpg",img_alt:"Second Player Image",p_yards:'192',r_yards:'102',rec_yards:'344'},
	{p_year:'Freshman', p_major:'Math',g_played:'8',player_img:"https://i.pinimg.com/originals/41/7c/fd/417cfd927122bfe343d757d55f8cf4bb.jpg",img_alt:"Third Player Image",p_yards:'35',r_yards:'70',rec_yards:'98'},
	{p_year:'Senior', p_major:'English',g_played:'15',player_img:"https://previews.123rf.com/images/sararoom/sararoom1409/sararoom140900048/31526217-vector-illustration-of-cartoon-american-football-player.jpg",img_alt:"Fourth Player Image",p_yards:'36',r_yards:'230',rec_yards:'90'}];

	document.getElementById('p_year').innerHTML = info[playerNum].p_year;
	document.getElementById('p_major').innerHTML = info[playerNum].p_major;
	document.getElementById('g_played').innerHTML = info[playerNum].g_played;
	document.getElementById('player_img').src = info[playerNum].player_img;
	document.getElementById('player_img').alt = info[playerNum].img_alt;
	document.getElementById('p_yards').innerHTML = info[playerNum].p_yards;
	document.getElementById('r_yards').innerHTML = info[playerNum].r_yards;
	document.getElementById('rec_yards').innerHTML = info[playerNum].rec_yards;
	var games = parseInt(info[playerNum].g_played);
	document.getElementById('avg_p_yards').innerHTML = Math.round(parseInt(info[playerNum].p_yards)/games);
	document.getElementById('avg_r_yards').innerHTML = Math.round(parseInt(info[playerNum].r_yards)/games);
	document.getElementById('avg_rec_yards').innerHTML = Math.round(parseInt(info[playerNum].rec_yards)/games);


}

