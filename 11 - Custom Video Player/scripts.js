/* get our elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.fullscreen');
let isFullScreen = false;

/* build our funtions */
function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}
function updateButton(){
    const icon = this.paused ? '►' : '❚ ❚';
    console.log(icon);
    toggle.textContent = icon;
}
function skip(){
    video.currentTime += parseFloat(this.dataset.skip);
}
function handleRangeUpdate(){
    video[this.name] = this.value;
}
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}
//function toggleFullscreen() {
 // const method = document.webkitFullscreenElement ? document.webkitExitFullscreen() : player.webkitRequestFullscreen();
//}

//function Button(){
    //const icons = this.document.webkitFullscreenElement ? 'Fullscreen' : 'ExitFullscreen';
    //console.log(icons);
    //toggle.textContent = icons;
//}
function toggleFullScreen(e) {
  if (isFullScreen) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else {
      console.error('Unable to find a fullscreen exit method.');
    }
    console.log('removing fullscreen class');
  } else {
    if (player.requestFullscreen) {
      player.requestFullscreen(); // standard
    } else if (player.webkitRequestFullscreen) {
      player.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    } else if (player.mozRequestFullScreen) {
      player.mozRequestFullScreen();
    } else if (player.msRequestFullscreen) {
      player.msRequestFullscreen();
    } else {
      console.error('Unable to find a fullscreen request method');
    }
  }
}

function toggleFullScreenClasses() {
  player.classList.toggle('fullscreen');
  isFullScreen = !isFullScreen;
}
/* hook up the event listners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mouseMove', handleRangeUpdate));
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
//fullscreen.addEventListener('click', toggleFullscreen);
fullscreen.addEventListener('click', toggleFullScreen);
document.addEventListener('fullscreenchange', toggleFullScreenClasses);
document.addEventListener('mozfullscreenchange', toggleFullScreenClasses);
document.addEventListener('webkitfullscreenchange', toggleFullScreenClasses);
document.addEventListener('msfullscreenchange', toggleFullScreenClasses);
//document.addEventListener(document.webkitExitFullscreen(), Button);
//player.addEventListener(player.webkitRequestFullscreen(), Button);


