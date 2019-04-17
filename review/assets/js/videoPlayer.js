const videoContainer = document.getElementById("jsVideoPlayer"); 
const videoPlayer = document.getElementById("jsVideo"); 
const playBtn = document.getElementById("jsPlayButton"); 
const volumeBtn = document.getElementById("jsVolumeButton"); 
const fullScreenBtn = document.getElementById("jsFullScreen"); 

function handlePlayClick() {
    if(videoPlayer.paused) {
        videoPlayer.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        videoPlayer.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
}

function handleVolumeClick() {
    if(videoPlayer.muted) {
        videoPlayer.muted = false; 
        volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else {
        videoPlayer.muted = true; 
        volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
}

function handleExitFullScreen() {
    document.exitFullscreen();
    fullScreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
    fullScreenBtn.removeEventListener("click", handleExitFullScreen);
    fullScreenBtn.addEventListener("click", handleFullScreenClick); 
}

function handleFullScreenClick() {
    videoContainer.requestFullscreen(); 
    fullScreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
    fullScreenBtn.removeEventListener("click", handleFullScreenClick);
    fullScreenBtn.addEventListener("click", handleExitFullScreen); 
}

function init() {
    playBtn.addEventListener("click", handlePlayClick);
    volumeBtn.addEventListener("click", handleVolumeClick); 
    fullScreenBtn.addEventListener("click", handleFullScreenClick); 
}

if(videoContainer) {
    init(); 
}