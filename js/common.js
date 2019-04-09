;
let arrCatalogContent = [{img: 'g1.png', name: 'Only Skinny Jeans', price: '£65.50'},
	{img: 'g2.png', name: 'Neck Knitted Jumper', price: '£76.25'},
	{img: 'g3.png', name: 'Turtle Neck Jumper in Rib', price: '£130.25'},
	{img: 'g4.png', name: 'With Patchwork Crochet', price: '£80.60'},
	{img: 'g5.png', name: 'Levi’s Jeans for women', price: 'More colours'},
	{img: 'g6.png', name: 'Boyfriend T-Shirt with <br> Bohemian Print', price: '£90.00'},
	{img: 'g7.png', name: 'Colour Block', price: '£550.50'},
	{img: 'g8.png', name: 'Monki Festval Knitted', price: '£24.75'},
	{img: 'g9.png', name: 'Oversized Cardigan', price: '£90.00'},
	{img: 'g10.png', name: 'Paul & Joe Sister Jumper <br> with Neon Trims', price: '£19.75'},
	{img: 'g11.png', name: 'Only Busted Knee Jean', price: '£140.50'},
	{img: 'g12.png', name: 'Boyfriend T-Shirt with <br> Bohemian Print', price: '£85.75'}];

	let arrDopCatalogContent = [{img: 'g1.png', name: 'product 1', price: '£65.50'},
	{img: 'g2.png', name: 'product 2', price: '£76.25'},
	{img: 'g3.png', name: 'product 3', price: '£130.25'},
	{img: 'g4.png', name: 'product 4', price: '£80.60'}];

/* открытие поля поиска */
function openSearchInput(target){
	let targetForm = target.parentElement.parentElement;
	targetForm.classList.toggle('open');
	targetForm.querySelector('.search__submit').classList.toggle('addButtonZ');
}


function updateClassForList(target, clsName){
	let targetParent = target.parentElement;

	for(let i = 0; i < targetParent.childElementCount; i++){
		if(targetParent.children[i].classList.contains(clsName)){
			targetParent.children[i].classList.remove(clsName);
		}
	}

	target.classList.add(clsName);
}

/* генерация html каталога */
function createProductItem(what, where, pos, arr){
	let tmp = _.template(what);
	where.insertAdjacentHTML(pos, tmp(arr));
}

function getLocalBag(){
	return JSON.parse(localStorage.getItem('bag'));
}

function setLocalBag(str){
	localStorage.setItem('bag',JSON.stringify(str));
}

function updateAllCounters(){
	updateBagCounter();
	updatePriceCounter();
}

function updateBagCounter(){
	document.querySelector('.shopping-bag__counter').innerHTML = getLocalBag() == null? 0 : getLocalBag().length;
}

function updatePriceCounter(){
	let priceCounters = document.querySelectorAll('.shopping-bag__price');
	_.map(priceCounters, n=> n.innerHTML = updatePrice() == null? 0 : updatePrice());
}

(updateBagCounter)();
(updatePriceCounter)();

function updatePrice(){
	let price = 0;
	let localArr = getLocalBag();
	_.map(localArr, num => price += +(num.price.slice(1))*num.quantity);
	return price.toFixed(2);// new tofixed
}

document.querySelector('.search').addEventListener('click', (e)=>{
	let target = e.target;
	if(target.className == 'search__icon'){
		openSearchInput(target);
	}else if(target.className == 'search__submit addButtonZ' && document.documentElement.clientWidth < 1024){
		openSearchInput(target);
	}
});

document.querySelector('.header').addEventListener('click',(e)=>{
	let target = e.target;
	if(target.parentElement.className == 'menu-toggle'){
		target.parentElement.closest('.menu').classList.toggle('menu_open');
		target.classList.toggle('close');
	}
});