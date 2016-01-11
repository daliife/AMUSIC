//buttonscontroler.js
var showingMiniplayer = false;

function updatePlayerInfo(urlImage, nameSong, nameAlbum){
    document.getElementById("imagePlayingSong").src = urlImage;
    document.getElementById("namePlayingSong").innerHTML = nameSong;
    document.getElementById("albumPlayingSong").innerHTML = nameAlbum;     
}

function callSnackBar(nameSong, nameAlbum){
    document.getElementById("snackButton").setAttribute('data-content',"Playing "+ nameSong + ", from " + nameAlbum);
    $("#snackButton").snackbar("toggle");  
  
}

function callMiniPlayerEffect(){
    if (!showingMiniplayer) {
        // $("#miniplayer").slideDown(1000);
        $( "#miniplayer" ).show( 'slide', { direction: "down" } , 500);
    };
}

function checkSubmit() {
    if ( document.getElementById("addon2").value == "" ){
        return 0;
    }else{
        return 1;
    }
}

function changeIconPlay(play_flag){
    if(play_flag){
        document.getElementById("iconPlayPause").innerHTML = "pause";
    }else{
        document.getElementById("iconPlayPause").innerHTML = "play_arrow";
        document.getElementById("snackButton").setAttribute('data-content',"Paused");
        $("#snackButton").snackbar("toggle");
    }
}

function playSong(url, urlImage, nameSong, nameAlbum, id, nameArtist){
    updatePlayerInfo(urlImage, nameSong, nameAlbum);
    //callSnackBar(nameSong,nameAlbum);
    callMiniPlayerEffect();
    addPlayer(url);
    addItemSongsPlayed(id,nameArtist,nameSong,nameAlbum,1);       
}

function show(){
    switch(this.id) {

        case "menu-toggle":
            $("#wrapper").toggleClass("toggled");
            break;

        case "searchButton":
            if (checkSubmit()){
                console.log("PETICIO --> " + document.getElementById("addon2").value);
                searchAction(document.getElementById("addon2").value);
            };

        case "linkSearch":
            $("#formSearch").show();
            $("#resultsSearch").show();
            $("#recomendations").hide();
            $("#songs").hide();
            $("#albums").hide();
            $("#artists").hide();
            break;

        case "linkRecomendations":
            $("#formSearch").show();
            $("#resultsSearch").hide();
            $("#recomendations").show();
            $("#songs").hide();
            $("#albums").hide();
            $("#artists").hide();
            updateSuggestions();              
            break;

        case "linkSongs":
            $("#formSearch").show();
            $("#resultsSearch").hide();
            $("#recomendations").hide();
            $("#songs").show();
            $("#albums").hide();
            $("#artists").hide(); 
            break;

        case "linkAlbums":
            $("#formSearch").show();
            $("#resultsSearch").hide();
            $("#recomendations").hide();
            $("#songs").hide();
            $("#albums").show();
            $("#artists").hide(); 
            break;

        case "linkArtists":
            $("#formSearch").show();
            $("#resultsSearch").hide();
            $("#recomendations").hide();
            $("#songs").hide();
            $("#albums").hide();
            $("#artists").show(); 
            break;

        case "volumeMin":
            setVolume(0);
            break;

        case "volumeMax":
            setVolume(100);
            break;

        case "playButton":
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

    $('[data-toggle="tooltip"]').tooltip();
    outputPlaylist();

    $('.form-control').keyup(function (e) {
        if (e.keyCode === 13 && checkSubmit()) {
           console.log("PETICIO: " + document.getElementById("addon2").value);
           searchAction(document.getElementById("addon2").value);
        }
      });


    document.onscroll = function() {
        if( $(window).scrollTop() > $('header').height() ) {
            $('nav > div.navbar').removeClass('navbar-static-top').addClass('navbar-fixed-top');    
        }
        else {
            $('nav > div.navbar').removeClass('navbar-fixed-top').addClass('navbar-static-top');
        }
    };    

    $(document).click(function (e){
        var container = $("#wrapper");
        if (!container.is(e.target) && container.has(e.target).length === 0 && event.target.id!=="sidebar-wrapper"){
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

    $("#playButton").click(show);

    $("#volumeMin").click(show);    

    $("#volumeMax").click(show); 

});
