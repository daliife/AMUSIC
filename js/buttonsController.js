(function buttonsController(){

    var song;

    function checkSubmit() {
        
        if ( document.getElementById("addon2").value == "" ){
            console.log("CANNOT SEARCH");
            return 0;
        }else{
            console.log("CAN SEARCH");
            return 1;
        }
    }

    function loadSong(){
        if(song == null){
            spotifyApi.searchTracks("Linoleum",{limit: 5}).then(function(data) {
              console.log("LOADING SONG! ",data);
              song = new Audio(data.tracks.items[0].preview_url);
              song.play();
            }, function(err) {
              console.error(err);
            });
        }
    }

    function show(){
        console.log("ID: " + this.id);

        switch(this.id) {
            case "menu-toggle":
                console.log("LINK TOGGLE MENU CLICKED!");
                //this.id.preventDefault();
                $("#wrapper").toggleClass("toggled");
                break;

            case "searchButton":
                if (checkSubmit()){
                    console.log("PETICIO: " + document.getElementById("addon2").value);
                    searchAction(document.getElementById("addon2").value);
                };

            case "linkSearch":
                console.log("LINK SEARCH CLICKED!");
                $("#formSearch").show();
                $("#resultsSearch").show();
                break;

            case "linkRecomendations":
                console.log("LINK RECOMENDATIONS CLICKED!");
                $("#formSearch").hide();
                $("#resultsSearch").hide();
                break;

            case "linkSongs":
                console.log("LINK SONGS CLICKED!");
                break;

            case "linkAlbums":
                console.log("LINK ALBUMS CLICKED!");
                break;

            case "linkArtists":
                console.log("LINK ARTISTS CLICKED!");
                break;

            case "linkSettings":
                console.log("LINK SETTINGS CLICKED!");
                break;

            case "linkLogout":
                console.log("LINK LOGOUT CLICKED!");
                break;

            case "linkSettings":
                console.log("LINK SETTINGS CLICKED!");
                break;

            case "play_pause":
                console.log("LINK PLAYPAUSE CLICKED!");


                loadSong(url);
                if(song.paused){
                    song.play();
                }else{
                    song.pause();
                }                
                break;

            default:
                alert("ID ERROR");
                break;
        }
    }


    $(document).ready(function(){

        $('.form-control').keyup(function (e) {
            if (e.keyCode === 13 && checkSubmit()) {
               console.log("PETICIO: " + document.getElementById("addon2").value);
               searchAction(document.getElementById("addon2").value);
            }
          });

        $(document).click(function (e)
        {
            var container = $("#wrapper");
            if (!container.is(e.target) && container.has(e.target).length === 0 && event.target.id!=="menu-toggle")
            {
                console.log("UNTOGGLE CLICKED!");
                container.addClass("toggled"); 
            }
        });

        $("#menu-toggle").click(show);

        $("#searchButton").click(show);

        $("#linkSearch").click(show);

        $("#linkRecomendations").click(show);

        $("#linkSongs").click(show);

        $("#linkAlbums").click(show);

        $("#linkArtists").click(show);

        $("#linkSettings").click(show);

        $("#linkLogout").click(show); 

        $("#play_pause").click(show); 

    });

}());