// (function buttonsController(){
    var song = document.createElement('audio');

    function checkSubmit() {        
        if ( document.getElementById("addon2").value == "" ){
            console.log("info: CANNOT SEARCH");
            return 0;
        }else{
            console.log("info: CAN SEARCH");
            return 1;
        }
    }

    function changeIconPlay(play_flag){
        if(play_flag){
            document.getElementById("iconPlayPause").innerHTML = "pause";
        }else{
            document.getElementById("iconPlayPause").innerHTML = "play_arrow";
        }
    }


    function playSong(url,urlImage,nameSong,nameAlbum){

        document.getElementById("imagePlayingSong").src = urlImage;
        document.getElementById("namePlayingSong").innerHTML = nameSong;
        document.getElementById("albumPlayingSong").innerHTML = nameAlbum;

        song.pause();
        song = new Audio(url);
        changeIconPlay(false);
        song.play();
        changeIconPlay(true);
        
    }

    function show(){
        console.log("ID: " + this.id);

        switch(this.id) {
            case "menu-toggle":
                console.log("LINK TOGGLE MENU CLICKED!");
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

            case "playButton":
                console.log("LINK PLAYPAUSE CLICKED!");
                if(song.paused){
                    changeIconPlay(true);
                    song.play();
                }else{
                    changeIconPlay(false);
                    song.pause();
                }                
                break;

            default:
                alert("info: ID ERROR");
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

        $(document).click(function (e){
            var container = $("#wrapper");
            if (!container.is(e.target) && container.has(e.target).length === 0 && event.target.id!=="menu-toggle"){
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

        $("#playButton").click(show); 

    });

// }());