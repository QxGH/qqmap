var audioUrl = 'https://cdn.xingchen.cn/f64b2319-a8a4-4d10-849c-fad4d6f9c678/Town_of_Windmill.mp3'

function stopPropagation(e) {
  window.event.stopPropagation();
}

function audioPlayHandle() {
  hideMarkerInfoWindow()
  let audio = document.getElementById('audioPlayer')
  let currentSrc = $('#audioPlayer').src
  if(currentSrc) {
    audioPlay()
  } else {
    $('#audioPlayer').attr('src', audioUrl);
    audio.addEventListener("canplay", function(){
      audioPlay()
    });
  }
}

function audioPauseHandle() {
  let audio = document.getElementById('audioPlayer')
  audio.pause()
  audio.removeEventListener("canplay", function(){
    audioPlay()
  });
}

function audioStopHandle() {
  audioPause();
  $('#audioPlayer').attr('src', '');
}

function audioPlay() {
  let audio = document.getElementById('audioPlayer')
  audio.play()
}