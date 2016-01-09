var song = document.createElement('audio');
var currentVolume;

document.getElementsByTagName('audio').volume ;
song.onended = function() {
    alert("The song has ended");
};

function getSongTime(){
    console.log("Current song time: "+ song.currentTime);
    //return song.currentTime;
}

function setSongTime(percentatge){ //Rep un percentatge, de 0 a 1!
    newTime = percentatge*song.duration;
    song.currentTime = newTime;
    console.log("New time setted for the song: " + song.currentTime);
}

function setVolume(volum){
  song.volume=volum;
}


function getVolume(){
 currentVolume = song.volume;
 console.log("El volum actual es" + currentVolume);
}

function addPlayer(url){

  song.pause();
  song = new Audio(url);
  song.play();

  changeIconPlay(true);
}