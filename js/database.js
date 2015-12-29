//Test for browser compatibility
if (window.openDatabase) {
    //Create the database the parameters are 1. the database name 2.version number 3. a description 4. the size of the database (in bytes) 1024 x 1024 = 1MB
    var mydb = openDatabase("AMusic", "0.1", "A Database of Songs I Like", 1024 * 1024);

    //create the cars table using SQL for the database using a transaction
    mydb.transaction(function (t) {
        t.executeSql("CREATE TABLE IF NOT EXISTS playlist (id INTEGER PRIMARY KEY ASC, song TEXT, artist TEXT, album TEXT, image TEXT)");
        t.executeSql("CREATE TABLE IF NOT EXISTS songsplayed (id TEXT PRIMARY KEY , title TEXT, artist TEXT, album TEXT, counter INT)");
    });



} else {
    alert("WebSQL is not supported by your browser!");
}

//function to output the list of cars in the database

function updatePlayList(transaction, results) {
    //initialise the listitems variable
    //var listitems = "";
    //get the car list holder ul
    //var listholder = document.getElementById("playlist");

    //clear cars list ul
    //listholder.innerHTML = "";

    var i;
    //Iterate through the results
    for (i = 0; i < results.rows.length; i++) {
        //Get the current row
        var row = results.rows.item(i);
        
        //listholder.innerHTML += "<li>" + row.song + " - " + row.artist + " (<a href='javascript:void(0);' onclick='deleteItem(" + row.id + ");'>Delete this item</a>)";
    }

}

//function to get the list of cars from the database

function outputPlaylist() {
    //check to ensure the mydb object has been created
    if (mydb) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        mydb.transaction(function (t) {
            t.executeSql("SELECT * FROM playlist", [], updatePlayList);
        });
    } else {
        alert("db not found, your browser does not support web sql!");
    }
}

//function to add the car to the database

function addItemPlaylist(song,artist,album,image) {
    //check to ensure the mydb object has been created
    if (mydb) {
        //get the values of the make and model text inputs
        //var song = document.getElementById("song").value;
        //var artist= document.getElementById("artist").value;

        //Test to ensure that the user has entered both a make and model
        if (song !== "" && artist !== "") {
            //Insert the user entered details into the cars table, note the use of the ? placeholder, these will replaced by the data passed in as an array as the second parameter
            mydb.transaction(function (t) {
                t.executeSql("INSERT INTO playlist(song, artist,album,image) VALUES (?, ?,?, ?)", [song, artist,album,image]);
                outputPlaylist();
            });
        } else {
            alert("You must enter a make and model!");
        }
    } else {
        alert("db not found, your browser does not support web sql!");
    }
}


//function to remove a car from the database, passed the row id as it's only parameter

function deleteItemPlayList(id) {
    //check to ensure the mydb object has been created
    if (mydb) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        mydb.transaction(function (t) {
            t.executeSql("DELETE FROM playlist WHERE id=?", [id], outputPlaylist);
        });
    } else {
        alert("db not found, your browser does not support web sql!");
    }
}



function addItemSongsPlayed(id,title,artist,album,timesplayed) {
    
    //check to ensure the mydb object has been created
    if (mydb) {
        //get the values of the make and model text inputs
        //var song = document.getElementById("song").value;
        //var artist= document.getElementById("artist").value;

        //Test to ensure that the user has entered both a make and model
        
        //Insert the user entered details into the cars table, note the use of the ? placeholder, these will replaced by the data passed in as an array as the second parameter
        mydb.transaction(function (t) {
            /*
            t.executeSql("SELECT ID FROM songsplayed WHERE ID =?",[id],[]);
            if (results.length >= 1){
                t.executeSql("UPDATE songsplayed SET counter = counter+1 WHERE ID =?",[id]);
            }else{
                t.executeSql("INSERT INTO songsplayed(id,title,artist,album,counter) VALUES (?,?,?,?,?)", [id,title,artist,album,timesplayed]);
                outputPlaylist();
            }

            */
            var counter="";
            t.executeSql("SELECT ID FROM songsplayed WHERE ID =?",[id],
            function(transaction, results){
            counter=results.rows.length;
        
            

            if (counter >= 1){
                console.log("HAS ESCOLTAT LA CANCO 2 O MES COPS");
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


 //outputPlaylist();