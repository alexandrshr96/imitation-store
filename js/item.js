;
function changeImage(target){
	let srcNameTarget = target.querySelector('img').getAttribute('src');
	target.closest('.item-img').querySelector('img').setAttribute('src',srcNameTarget);
}

function createItem(){
	let tmp = _.template(document.getElementById('item-content-template').innerHTML);
	document.querySelector('.item-content__style-wrap').insertAdjacentHTML('beforebegin', tmp(arrCatalogContent));
}
createItem();

function createObjForBag(target){
	let targetElem = target.closest('.item-content-wrap');
	let idItem = JSON.parse(localStorage.getItem('idItem'));
	let style_size = targetElem.querySelectorAll('.item-content__style')[0].
	querySelector('.item-content__list-item.select');
	let style_color = targetElem.querySelectorAll('.item-content__style')[1].
	querySelector('.item-content__list-item.select');
	//let quantity = document.querySelector('.item-quantity').value;
	let objCard = {};

	objCard.img = arrCatalogContent[idItem].img;
	objCard.name = arrCatalogContent[idItem].name;
	objCard.price = arrCatalogContent[idItem].price;
	objCard.color = style_color != null ? style_color.innerHTML : 'Not Selected';
	objCard.size = style_size != null ? style_size.innerHTML : 'Not Selected';
	//objCard.quantity = +quantity;
	return objCard;
}

function compareObjBag(localObj, obj){
	let quantity = document.querySelector('.item-quantity').value;
	let objWithoutQ = _.map(localObj, (o)=> _.omit(o, 'quantity'));
	let res = _.find(objWithoutQ, (o)=> _.isEqual(o, obj));
	if(!res){
		obj.quantity = +quantity; 
		return obj;
	}else{
		return _.indexOf(objWithoutQ, res);
	}
}

function addToBag(obj){
	let bagData = getLocalBag() || [];
	let itemQuantity = document.querySelector('.item-quantity').value <= 0 ? 1 : document.querySelector('.item-quantity').value;
	if(bagData.length != 0){
		let res = compareObjBag(bagData, obj);
		if(typeof res == 'number'){
			//let itemQuantity = document.querySelector('.item-quantity').value;
			bagData[res].quantity += +(itemQuantity);
		}else{
			//res.quantity = itemQuantity;
			bagData.push(res);
		}
	}else{
		obj.quantity = itemQuantity;
		bagData.push(obj);
	}
	setLocalBag(bagData);
}

function checkSelectedStyle(target){
	let targParent = target.closest('.item-content-wrap');
	let lists = targParent.querySelectorAll('.item-content__style-list');

	return _.every(lists, i => _.find(i.children, j => j.classList.contains('select')));
}

document.querySelector('.item').addEventListener('click',(e)=>{
	let target = e.target;

	if(target.className == 'item-content__list-item'){
		updateClassForList(target, 'select');
	}else if(target.closest('.item-img__min')){
		updateClassForList(target.closest('.item-img__min'), 'select');
		changeImage(target.closest('.item-img__min'));
	}else if(target.className == 'item-content__button btn'){
		let quantity = document.querySelector('.item-quantity').value;
		
		if(checkSelectedStyle(target)){
			target.closest('.item-content-wrap').querySelector('.item-content__style-wrap').classList.remove('error');
			if (+quantity >= 0){
				let obj = createObjForBag(target);
				addToBag(obj);
				updateAllCounters();
			}
			
		}else{
			target.closest('.item-content-wrap').querySelector('.item-content__style-wrap').classList.add('error');
		}
	}
});