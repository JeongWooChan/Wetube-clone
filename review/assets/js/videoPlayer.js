const videoContainer = document.getElementById("jsVideoPlayer"); 
const videoPlayer = document.getElementById("jsVideo"); 
const playBtn = document.getElementById("jsPlayButton"); 
const volumeBtn = document.getElementById("jsVolumeButton"); 
const fullScreenBtn = document.getElementById("jsFullScreen"); 
const totalTime = document.getElementById("totalTime");
const currentTime = document.getElementById("currentTime");

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

const formatDate = seconds => {
    const secondsNumber = parseInt(seconds, 10);
    let hours = Math.floor(secondsNumber / 3600);
    let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
    let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;
  
    if (hours < 10) {
      hours = `0${hours}`;
    }
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (seconds < 10) {
      totalSeconds = `0${totalSeconds}`;
    }
    return `${hours}:${minutes}:${totalSeconds}`;
};

function setTotalTime() {
    const totalTimeString = formatDate(videoPlayer.duration);
    totalTime.innerHTML = totalTimeString; 
    setInterval(getCurrentTime, 1000); 
}

function getCurrentTime() {
    currentTime.innerHTML = formatDate(videoPlayer.currentTime); 
}

function init() {
    playBtn.addEventListener("click", handlePlayClick);
    volumeBtn.addEventListener("click", handleVolumeClick); 
    fullScreenBtn.addEventListener("click", handleFullScreenClick); 
    videoPlayer.addEventListener("loadedmetadata", setTotalTime);
}

if(videoContainer) {
    init(); 
}