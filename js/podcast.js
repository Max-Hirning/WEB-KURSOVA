const video = document.getElementById("myVideo");
const playPauseBtn = document.getElementById("playPauseBtn");
const muteBtn = document.getElementById("muteBtn");
const progressBar = document.getElementById("progressBar");
const speedControl = document.getElementById("speedControl");
const speedValue = document.getElementById("speedValue");

function togglePlayPause() {
    if (video.paused || video.ended) {
        video.play();
        playPauseBtn.textContent = "⏸ Pause";
    } else {
        video.pause();
        playPauseBtn.textContent = "▶ Play";
    }
}

function increaseVolume() {
    if (video.volume < 1) {
        video.volume = Math.min(1, video.volume + 0.1);
    }
}

function decreaseVolume() {
    if (video.volume > 0) {
        video.volume = Math.max(0, video.volume - 0.1);
    }
}

function toggleMute() {
    video.muted = !video.muted;
    muteBtn.textContent = video.muted ? "🔊 Unmute" : "🔇 Mute";
}

// Update progress bar as video plays
video.addEventListener("timeupdate", () => {
    progressBar.value = (video.currentTime / video.duration) * 100;
});

// Seek video when user interacts with progress bar
progressBar.addEventListener("input", () => {
    video.currentTime = (progressBar.value / 100) * video.duration;
});

// Change playback speed
speedControl.addEventListener("input", () => {
    video.playbackRate = speedControl.value;
    speedValue.textContent = speedControl.value + "x";
});
