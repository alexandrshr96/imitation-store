;let slides = document.querySelectorAll('.slide-wrap'),
	radioInputs = document.querySelectorAll('input[type="radio"]');
let currentSlide = 0,
	startX = 0,
	startY = 0,
	endX = 0,
	endY = 0;

/* смена слайдов по интервалу */
let timerId = setTimeout( function run (){
	changeSlide();
	timerId = setTimeout(run, 10000);
}, 10000);

/* обнуление таймера */
function zeroingTimer(){
	clearTimeout(timerId);
	timerId = setTimeout( function run (){
		changeSlide();
		timerId = setTimeout(run, 10000);
	}, 10000);
}

/* переключение слайда */
function changeSlide(n){
	n = n == undefined ? currentSlide + 1 : n;
	slides[currentSlide].classList.toggle('show-slide');
	currentSlide = (n+slides.length)%slides.length;
	radioInputs[currentSlide].checked = true;
	slides[currentSlide].classList.toggle('show-slide');
}

function getNumberSlide(target){
	let idInp = target.getAttribute('id');

	for(let i = 0; i < radioInputs.length; i++){
		if(radioInputs[i].getAttribute('id') == idInp){
			radioInputs[i].checked = true;
			currentSlide = i;
			return slides[i];
		}
	}
}

document.querySelector('.slider').addEventListener('click',(e)=>{
	let target = e.target;

	if(target.className == 'slider__arrow-left'){
		changeSlide(currentSlide - 1);
		zeroingTimer();
	}else if(target.className == 'slider__arrow-right'){
		changeSlide(currentSlide + 1);
		zeroingTimer();
	}else if(target.tagName == 'INPUT'){
		let targSlide = getNumberSlide(target);
		updateClassForList(targSlide, 'show-slide');
		zeroingTimer();
	}
});

document.querySelector('.slider').addEventListener('touchstart',(e)=>{
	startX = e.changedTouches[0].screenX;
	startY = e.changedTouches[0].screenY;
});

document.querySelector('.slider').addEventListener('touchend',(e)=>{
	endX = e.changedTouches[0].screenX;
	endY = e.changedTouches[0].screenY;

	if(startX < endX){
		changeSlide(currentSlide - 1);
		zeroingTimer();
	}
	if(startX > endX){
		changeSlide(currentSlide + 1);
		zeroingTimer();
	}
});