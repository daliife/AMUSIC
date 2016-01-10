
var song = document.createElement('audio');
song.setAttribute("id","audio");
var isPlaying = false;

// SECCIO CREACIO AUDIO + PLAYPAUSE
function progress() {
	document.getElementById("progress").value = ((song.currentTime/song.duration)*100);
}
function updateSource(url){ 
    song.src = url;
    song.volume = 0.5;
    song.load();
    song.addEventListener("timeupdate", progress, false);
    getVolume();
}
function addPlayer(url){
	song.pause();
	updateSource(url);
	song.play();
	changeIconPlay(true);
	isPlaying = true;
}

// SECCIO VOLUM
function setVolume(volum){
  song.volume=volum/100;
  getVolume();
}
function getVolume(){
	console.log("El volum actual es de: " + song.volume*100 + "%");
}

// SECCIO TEMPS AUDIO
function getSongTime(){
    console.log("Current song time: "+ song.currentTime + " seconds");
}
function setTiming(percent){
	if (isPlaying) {
		song.currentTime = song.duration/100*percent;
		console.log("Time set at " + song.currentTime);		
	};
}
song.onended = function() {
    console.log("The song has ended");
	$("#miniplayer").hide("slow");
	isPlaying = false;
};


// var $aud = $("#audio"),
//   $pp  = $('#playpause'),
//   $vol = $('#volume'),
//   $bar = $("#progressbar"),
//   AUDIO= $aud[0];

// AUDIO.volume = 0.5;
// AUDIO.addEventListener("timeupdate", progress, false);

// function getTime(t) {
// var m=~~(t/60), s=~~(t % 60);
// return (m<10?"0"+m:m)+':'+(s<10?"0"+s:s);
// }

// function progress() {
// $bar.slider('value', ~~(100/AUDIO.duration*AUDIO.currentTime));
// // $pp.text(getTime(AUDIO.currentTime));
// }

// $vol.slider( {
// value : AUDIO.volume*100,
// slide : function(ev, ui) {
//   // $vol.css({background:"hsla(180,"+ui.value+"%,50%,1)"});
//   AUDIO.volume = ui.value/100; 
// } 
// });

// $bar.slider( {
// value : AUDIO.currentTime,
// slide : function(ev, ui) {
//   AUDIO.currentTime = AUDIO.duration/100*ui.value;
// }
// });

// $pp.click(function() {
// return AUDIO[AUDIO.paused?'play':'pause']();
// });
  


