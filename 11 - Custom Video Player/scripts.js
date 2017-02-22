// get all the elements

const player =  document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress  =  player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const videoToggle = player.querySelector('.toggle');
const ranges = player.querySelectorAll('.player__slider');
const skipButtons = player.querySelectorAll('[data-skip]');


//build the functions

function togglePlay(){
	const method = video.paused ? 'play' : 'pause';
	video[method]();
}

function toggleButton(){
	const icon = this.paused ? '►' : '❚ ❚';
	videoToggle.textContent =  icon;
}

function skip(){
	video.currentTime += parseFloat(this.dataset.skip);
	console.log('skip called');
}

function updateRange(){
	video[this.name] = this.value;
	console.log(this.name);
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime =  scrubTime;
	console.log(e)
}

//add event listeners
let mouseDown = false;
video.addEventListener('click', togglePlay);
video.addEventListener('pause', toggleButton);
video.addEventListener('play', toggleButton);
videoToggle.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', handleProgress);

skipButtons.forEach(skipButton => skipButton.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', updateRange));
ranges.forEach(range => range.addEventListener('mousemove', updateRange));

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e)=> mouseDown && scrub(e));
progress.addEventListener('mousedown', ()=> mouseDown = true);
progress.addEventListener('mouseup', ()=> mouseDown = false);