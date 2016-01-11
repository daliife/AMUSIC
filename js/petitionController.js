
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

function recomendedSongs(artist){

	spotifyApi.getArtistRelatedArtists(artist, null).then(function(data) {  
	    console.log(data);
	    //Guardo Artistes
	    for(var i = 0; i<numArtists;i++){
			getRecArtists(data.artists[i].name,1);
		}
	    //Guardo cançons
		for(var i = 0; i<numSongs;i++){
			getRecSongs(data.artists[i].name,1);
		}
		//Guardo albums
		for(var i = 0; i<numSongs;i++){
			getRecAlbums(data.artists[i].name,1);
		}

	  }, function(err) {
	    console.error(err);
	  });

}

function trendingSongs(){

	$.ajax({
		url:"http://developer.echonest.com/api/v4/artist/top_hottt?api_key=KLQS7H9RMIF0J7KNS&format=json&results="+numArtists+"&start=0&bucket=hotttnesss",
		type:"GET",
		dataType:"json",
		success:function(json){
			for (var i=0 ; i<json.response.artists.length; i++){
				getRecArtists(json.response.artists[i].name,1);
				getRecSongs(json.response.artists[i].name,2);
				getRecAlbums(json.response.artists[i].name,2);
			}
		},error: function(){
			console.log("error: Cannot get trendingSongs");
		}
	});
}

function getRecSongs(petitionName, numSongs){

		spotifyApi.searchTracks(petitionName, {limit: numSongs}).then(function(data) {    
		    for (var i = 0; i < numSongs; i++) {
		    	 $("#songTemplate").tmpl(data.tracks.items[i]).appendTo("#songsListRecomendation");
		    } 	
		  }, function(err) {
		    console.error(err);
		  });

}

function getRecAlbums(petitionName, numAlbums){

		spotifyApi.searchAlbums(petitionName, {limit: numAlbums}).then(function(data) {        
		    for (var i = 0; i < numAlbums; i++) {
		    	 $("#albumTemplate").tmpl(data.albums.items[i]).appendTo("#albumsListRecomendation");
		    }   	
		  }, function(err) {
		    console.error(err);
		  });

}

function getRecArtists(petitionName, numArtists){

		spotifyApi.searchArtists(petitionName, {limit: numArtists}).then(function(data) {    
			//console.log(data);		   
		    for (var i = 0; i < numArtists; i++) {
		    	 $("#artistTemplate").tmpl(data.artists.items[i]).appendTo("#artistsListRecomendation");
		    }   	
		  }, function(err) {
		    console.error(err);
		  });

}

function updateSuggestions(){
	$("#songsListRecomendation").empty();
	$("#artistsListRecomendation").empty();
	$("#albumsListRecomendation").empty();
	isEmpty();
	
	if(true){
		console.log("No hi ha res");
		trendingSongs();
		//songs
	}else{
		console.log("Hi ha quelcom");
		//mostPlayed();
		recomendSongs(mostPlayed());		
	}
	
}

