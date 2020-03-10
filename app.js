const song = document.querySelector("audio.song");
const play = document.querySelector(".play");
const outline = document.querySelector(".moving-outline circle");
const video = document.querySelector(".video-container video");

const svgMeditation = document.querySelector(".meditation");

//sounds
const soundBtns = document.querySelectorAll(".sound-picker button");

//time display
const timeDisplay = document.querySelector("h3.time-display");
const timeSelect = document.querySelectorAll(".time-select button");

//get the length of the outline
const outlineLength = outline.getTotalLength();
console.log(outlineLength);

//get the duration of listening
let listenDuration = 600;

outline.style.strokeDasharray = outlineLength;
outline.style.strokeDashoffset = outlineLength;

//pick different sounds
soundBtns.forEach(sound => {
  sound.addEventListener("click", function() {
    song.src = this.getAttribute("data-sound");
    video.src = this.getAttribute("data-video");
    checkStatus(song);
  });
});

//play the music
play.addEventListener("click", () => {
  checkStatus(song);
});

//create a function to check the music status play or pause
function checkStatus() {
  if (song.paused) {
    song.play();
    video.play();
    play.src = "svg/pause.svg";
    play.style.transform = "translateX(-2%)";
  } else {
    song.pause();
    video.pause();
    play.src = "svg/play.svg";
    play.style.transform = "translateX(10%)";
  }
}

//animate the track circle blue bar
song.ontimeupdate = () => {
  let currentTime = song.currentTime;
  // console.log(currentTime); when the song is playing it keeps updating every second
  let elapse = listenDuration - currentTime;
  let minutes = Math.floor(elapse / 60);
  let seconds = Math.floor(elapse % 60);

  minutes < 10 ? (minutes = "0" + minutes) : (minutes = minutes);
  seconds < 10 ? (seconds = "0" + seconds) : (seconds = seconds);

  let progress = outlineLength - (currentTime / listenDuration) * outlineLength;
  outline.style.strokeDashoffset = progress;

  //update the time text
  timeDisplay.textContent = `${minutes}:${seconds}`;

  //reset when the song finishes
  if (currentTime >= listenDuration) {
    song.pause();
    video.pause();
    song.currentTime = 0;
    play.src = "svg/play.svg";
    play.style.transform = "translateX(10%)";
  }
};

//pick different time length
timeSelect.forEach(option => {
  option.addEventListener("click", function() {
    listenDuration = this.getAttribute("data-time");

    let minutes = Math.floor(listenDuration / 60);
    let seconds = Math.floor(listenDuration % 60);
    minutes < 10 ? (minutes = "0" + minutes) : (minutes = minutes);
    seconds < 10 ? (seconds = "0" + seconds) : (seconds = seconds);

    timeDisplay.textContent = `${minutes} : ${seconds}`;
  });
});
