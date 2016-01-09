// buttonscontroler.js

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
    document.getElementById("imagePlayingSong").src = urlImage;
    document.getElementById("namePlayingSong").innerHTML = nameSong;
    document.getElementById("albumPlayingSong").innerHTML = nameAlbum;
    
    document.getElementById("snackButton").setAttribute('data-content',"Playing "+ nameSong + ", from " + nameAlbum);
    $("#snackButton").snackbar("toggle");
    
    song.pause();
    song = new Audio(url);
    song.play();
    changeIconPlay(true);
    
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
            $("#formSearch").hide();
            $("#resultsSearch").hide();
            $("#recomendations").show();
            $("#songs").hide();
            $("#albums").hide();
            $("#artists").hide();              
            break;

        case "linkSongs":
            $("#formSearch").hide();
            $("#resultsSearch").hide();
            $("#recomendations").hide();
            $("#songs").show();
            $("#albums").hide();
            $("#artists").hide(); 
            break;

        case "linkAlbums":
            $("#formSearch").hide();
            $("#resultsSearch").hide();
            $("#recomendations").hide();
            $("#songs").hide();
            $("#albums").show();
            $("#artists").hide(); 
            break;

        case "linkArtists":
            $("#formSearch").hide();
            $("#resultsSearch").hide();
            $("#recomendations").hide();
            $("#songs").hide();
            $("#albums").hide();
            $("#artists").show(); 
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

    $(document).click(function (e){
        var container = $("#wrapper");
        if (!container.is(e.target) && container.has(e.target).length === 0 && event.target.id!=="menu-toggle"){
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

});

// var myMedia = document.createElement('audio');
// $('#player').append(myMedia);
// myMedia.id = "myMedia";
// playAudio('http://iviewsource.com/exercises/audioslider/audio/ViewSource', 0);

// function playAudio(fileName, myVolume) {
//     var mediaExt = (myMedia.canPlayType('audio/mp3')) ? '.mp3' 
//     : (myMedia.canPlayType('audio/ogg')) ? '.ogg' 
//     : '';
//     if (mediaExt) {
//     myMedia.src = fileName + mediaExt;
//     myMedia.setAttribute('loop', 'loop');
//     setVolume(myVolume);
//     myMedia.play();
//   }
// }

// function setVolume(myVolume) {
//     var myMedia = document.getElementById('myMedia');
//     myMedia.volume = myVolume;
// }