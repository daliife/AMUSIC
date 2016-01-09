//Test for browser compatibility
var urlArtist = " ";

if (window.openDatabase) {
    //Create the database the parameters are 1. the database name 2.version number 3. a description 4. the size of the database (in bytes) 1024 x 1024 = 1MB
    var mydb = openDatabase("AMusic", "0.1", "A Database of Songs I Like", 1024 * 1024);
    
    mydb.transaction(function (t) {
    	//RESETEJAR LA DATABASE -->
    	t.executeSql("DROP TABLE playlist");
    	t.executeSql("DROP TABLE songsplayed");
        t.executeSql("CREATE TABLE IF NOT EXISTS playlist (id INTEGER PRIMARY KEY ASC, song TEXT, artist TEXT, album TEXT, image TEXT, preview_song TEXT, popularity INT, url_Artist TEXT)");
        t.executeSql("CREATE TABLE IF NOT EXISTS songsplayed (id TEXT PRIMARY KEY , title TEXT, artist TEXT, album TEXT, counter INT)");
    });

} else {
    alert("WebSQL is not supported by your browser!");
}


function updateFavoritedSongs(transaction, results) {
    var i;
   	$("#songsListFavorited").empty();
    for (i = 0; i < results.rows.length; i++) {
        var row = results.rows.item(i);
        $("#songsFavorited").tmpl(row).appendTo("#songsListFavorited");
    }

}

function updateFavoritedAlbums(transaction, results) {
    var i;
	$("#albumsListFavorited").empty();
    for (i = 0; i < results.rows.length; i++) {
        var row = results.rows.item(i);
        $("#albumsFavorited").tmpl(row).appendTo("#albumsListFavorited");
    }

}

function updateFavoritedArtists(transaction, results) {
    var i;
    $("#artistsListFavorited").empty();
    for (i = 0; i < results.rows.length; i++) {
        var row = results.rows.item(i);
        
        $("#artistsFavorited").tmpl(row).appendTo("#artistsListFavorited");
    }

}

function outputPlaylist() {
    if (mydb) {
        mydb.transaction(function (t) {
            t.executeSql("SELECT * FROM playlist", [], updateFavoritedSongs);
            t.executeSql("SELECT DISTINCT album,image FROM playlist", [], updateFavoritedAlbums);
            t.executeSql("SELECT DISTINCT artist,image,popularity,urlArtist FROM playlist GROUP BY artist", [], updateFavoritedArtists);
        });
    } else {
        alert("ERROR: db not found, your browser does not support web sql!");
    }

}

function addItemPlaylist(song, artist, album, image, preview, id, popularity, url) {
   	
   
   	$("#songsListFavorited").empty();
   	$("#albumsListFavorited").empty();
    $("#artistsListFavorited").empty();
	id.children[0].innerHTML = "star";

    if (mydb) {
       
        if (song !== "" && artist !== "") {
            

            $.ajax({
                url: url,
                type:"GET",
                dataType:"json",
                success:function(json){ 
                    urlArtist = json.images[0].url;
                    console.log("PART1-->" + urlArtist);        
                },
                error: function(){
                    console.log("error: Cannot get url artist!");
                }
            }); 

            mydb.transaction(function (t) {
                console.log("PART2-->" + urlArtist);
                t.executeSql("INSERT INTO playlist(song,artist,album,image,preview_song,popularity,url_Artist) VALUES (?, ?, ?, ?, ?, ?, ?)", [song, artist, album, image, preview, popularity, urlArtist]);
                outputPlaylist();
            });
        	updateBadges();

        } else {
            alert("You must enter a make and model!");
        }
    } else {
        alert("ERROR: db not found, your browser does not support web sql!");
    }

}

function deleteItemPlayList(id) {
    if (mydb) {
        mydb.transaction(function (t) {
            t.executeSql("DELETE FROM playlist WHERE id=?", [id], outputPlaylist);
        });
        
       	updateBadges();     

    } else {
        alert("db not found, your browser does not support web sql!");
    }

}

function deleteArtistPlayList(artist) {
    if (mydb) {
        mydb.transaction(function (t) {
            t.executeSql("DELETE FROM playlist WHERE artist=?", [artist], outputPlaylist);
        });

        updateBadges();

    } else {
        alert("db not found, your browser does not support web sql!");
    }

}

function addItemSongsPlayed(id, title, artist, album, timesplayed) { 
    if (mydb) {

        mydb.transaction(function (t) {

            var counter="";
            t.executeSql("SELECT ID FROM songsplayed WHERE ID =?",[id],
            function(transaction, results){
            counter=results.rows.length;
        
            if (counter >= 1){
                console.log("info: HAS ESCOLTAT LA CANCO 2 O MES COPS");
                t.executeSql("UPDATE songsplayed SET counter = counter+1 WHERE ID =?",[id]);
            }else{
                  t.executeSql("INSERT INTO songsplayed(id,title,artist,album,counter) VALUES (?,?,?,?,?)", [id,title,artist,album,timesplayed]);
                
            }
         
         });
        
        });

    } else {
        alert("db not found, your browser does not support web sql!");
    }

}

function updateBadgeSongs(transaction, results) {
	document.getElementById("songBadge").innerHTML = results.rows[0].numSongs;
}

function updateBadgeAlbums(transaction, results) {
	document.getElementById("albumBadge").innerHTML = results.rows[0].numAlbums;
}

function updateBadgeArtists(transaction, results) {
	document.getElementById("artistBadge").innerHTML = results.rows[0].numArtists;;
}

function updateBadges() {
    if (mydb) {
        mydb.transaction(function (t) {
            t.executeSql("SELECT COUNT(DISTINCT song) AS numSongs FROM playlist", [], updateBadgeSongs);
           	t.executeSql("SELECT COUNT(DISTINCT album) AS numAlbums FROM playlist", [], updateBadgeAlbums);
         	t.executeSql("SELECT COUNT(DISTINCT artist) AS numArtists FROM playlist", [], updateBadgeArtists);
        });
    } else {
        alert("ERROR: db not found, your browser does not support web sql!");
    }
}





