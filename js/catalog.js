;let arrfiltrContent = [{ name: 'Fasion', items: ['Not selected','Nail the 90s','Casual style',
	'New Look','Sport','Vintage','Сlassical style']},
	{name: 'Product type', items: ['Not selected', 'Coats &amp; Jackets','Dresses','Jersey Tops']},
	{name: 'Color', items: ['Not selected', 'Black','Blue','Red','Green','Golden']},
	{name: 'Brand', items: ['Not selected','Chi Chi London','Antipodium','Adidas','New Balance','River Island']},
	{name: 'Size', items: ['Not selected','UK 2','UK 18','UK 18L','UK 20','UK 20L','UK 20S','UK 22S','UK 22']},
	{name: 'Price range', items: ['Not selected','To &pound;99','&pound;100-&pound;299','From &pound;300']}];

/* открытие фильтра на моб */
function openFiltrMob(target){
	target.querySelector('.filtrMob-ul-wrap').classList.toggle('open');
	target.querySelector('.filtrMob-arrow').classList.toggle('selected'); 
}

/* добавление выбранного фильтра */
function insertSelectedTextDesk(index, text){
	let parentBlock = collectionFiltrItems[index].querySelector('.filtr-header__select-item');
	if(text != 'Not selected'){
		if(!parentBlock.parentElement.classList.contains('toggle')){
			parentBlock.parentElement.classList.add('toggle');
		}
		parentBlock.innerHTML = text;
	}else{
		parentBlock.parentElement.classList.remove('toggle');
		parentBlock.innerHTML = '';
	}
}

/* замена текста выбранного фильтра */
function insertSelectedTextMob(index, text){
	let ulCaption = collectionFiltrItemsMob[index].querySelector('span').innerHTML;
	let parentBlock = document.querySelector(`div[class*="filtrMob-caption ul-${ulCaption.replace(/\s/g, '')}"] span`);

	if(text != 'Not selected'){
		if(!parentBlock.parentElement.classList.contains('toggle')){
			parentBlock.parentElement.classList.add('toggle');
		}
		parentBlock.innerHTML = text;
	}else{
		parentBlock.parentElement.classList.remove('toggle');
		parentBlock.innerHTML = ulCaption;
	}
}

/* создание товаров каталогов */
createProductItem(document.getElementById('catalog-item-template').innerHTML,
 document.querySelector('.catalog__button-wrap'), 'beforebegin', arrCatalogContent);

/* создание фильтра для десктопа */
createProductItem(document.getElementById('filtr-item-template').innerHTML,
document.querySelector('.filtr-list-wrap-desk'), 'beforeEnd', arrfiltrContent);

/* создание фильтра для планшета и моб */
createProductItem(document.getElementById('filtrTblMob-item-template').innerHTML,
document.querySelector('.filtr-list-wrap-tblMob'), 'beforeEnd', arrfiltrContent);

let collectionFiltrItems = document.querySelectorAll('.filtr-item');
let collectionFiltrItemsMob = document.querySelectorAll('.filtrMob-ul-item');
let collectionFiltrListsMob = document.querySelectorAll('.filtrMob-list');

document.querySelector('.filtr-list').addEventListener('click',(e)=>{
	let target = e.target;

	if(target.className == 'filtr-list-wrap-tblMob' || target.classList.contains('filtrMob-arrow')){
		let targElem = target.classList.contains('filtrMob-arrow') ? target.closest('.filtr-list-wrap-tblMob') : target;
		openFiltrMob(targElem);
		document.querySelector('.overlay-block').classList.toggle('selected');
	}else if(target.className == 'filtr-list-item'){
		let index = +(target.closest('.filtr-ul-wrap').dataset.idul);
		let text = target.innerHTML;
		let liInMobFiltr;
		_.find(collectionFiltrListsMob, ul=> liInMobFiltr = _.find(ul.children, li=> li.innerHTML == text));
		insertSelectedTextMob(index, text);
		insertSelectedTextDesk(index, text);
		updateClassForList(liInMobFiltr, 'toggle');
	}else if(target.className == 'filtrMob-list-item'){
		let index = target.closest('.filtrMob-ul-item').dataset.idul;
		let text = target.innerHTML;

		updateClassForList(target, 'toggle');
		insertSelectedTextDesk(index, text);
		insertSelectedTextMob(index, text);


	}
});

document.querySelector('.filtr-list').addEventListener('mouseover',(e)=>{
	let target = e.target;

	if(target.className == 'filtr-header' || target.className == 'filtr-header__caption' || target.className == 'filtr-list-item'){
		document.querySelector('.overlay-block').classList.add('selected');
	}
});

document.querySelector('.filtr-list').addEventListener('mouseout',(e)=>{
	let target = e.target;

	if(target.className == 'filtr-header' || target.className == 'filtr-header__caption' || target.className == 'filtr-list-item'){
		document.querySelector('.overlay-block').classList.remove('selected');
	}
});

document.querySelector('.catalog').addEventListener('click', (e)=>{
	let target = e.target;
	console.log(target);

	if(target.className == 'catalog-item__link' || target.tagName == 'IMG'){
		let id = +(target.closest('.catalog-item').dataset.id);
		localStorage.setItem('idItem',JSON.stringify(id));
	}else if(target.className == 'catalog__button btn'){
		let tmp = _.template(document.getElementById('catalogDop-item-template').innerHTML);
		document.querySelector('.catalog-list.standart_ul').insertAdjacentHTML('beforeend', tmp(arrDopCatalogContent));
	}
});

/* document.querySelector('.search__input').addEventListener('keypress', (e)=>{
	let target = e.target;

	let names = document.querySelectorAll('.product-item__name');

	for(let i = 0; i < names.length; i++){

	}
}); */