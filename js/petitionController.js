
var spotifyApi = new SpotifyWebApi();
var numSongs = 6;
var numArtists = 6;
var numAlbums = 6;
// var clientID = "6b97605d73b54ff0910c0d10b0410513";
// var clientIDSecret = "9b56e5b116594e71bcaabbc4fc2341f8";
// spotifyApi.setAccessToken(clientIDSecret);


function getSongs(petitionName, numSongs){	
		
		$("#songsList").empty();

		spotifyApi.searchTracks(petitionName, {limit: numSongs}).then(function(data) {   
			
		    for (var i = 0; i < numSongs; i++) {
		    	 $("#songTemplate").tmpl(data.tracks.items[i]).appendTo("#songsList");
		    }   	
		  }, function(err) {
		    console.error(err);
		  });

}

function getAlbums(petitionName, numAlbums){	
		
		$("#albumsList").empty();

		spotifyApi.searchAlbums(petitionName, {limit: numAlbums}).then(function(data) {        
		    for (var i = 0; i < numAlbums; i++) {
		    	 $("#albumTemplate").tmpl(data.albums.items[i]).appendTo("#albumsList");
		    }   	
		  }, function(err) {
		    console.error(err);
		  });

}

function getArtists(petitionName, numArtists){	
		
		$("#artistsList").empty();

		spotifyApi.searchArtists(petitionName, {limit: numArtists}).then(function(data) {    
		    for (var i = 0; i < numArtists; i++) {
		    	 $("#artistTemplate").tmpl(data.artists.items[i]).appendTo("#artistsList");
		    }   	
		  }, function(err) {
		    console.error(err);
		  });

}

function searchAction(petitionName){

		getSongs(petitionName, numSongs);
		getAlbums(petitionName,numAlbums);
		getArtists(petitionName,numArtists);

}

function similarArtists(artist){

	$.ajax({
		url:"http://developer.echonest.com/api/v4/artist/similar?api_key=KLQS7H9RMIF0J7KNS&id="+artist+"&format=json&results=10&start=0",
		type:"GET",
		dataType:"json",
		success:function(json){
			for (var i=0 ; i<json.response.artists.length; i++){
				console.log(json.response.artists[i].name +"   "+ json.response.artists[i].id );
			}
			// console.log(json.items[0]);
		}
	})

}





