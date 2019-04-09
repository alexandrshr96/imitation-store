;
let arrBagItems = getLocalBag();

createProductItem(document.getElementById('bag-item-template').innerHTML,
document.querySelector('.shopping-bag-wrap'), 'afterBegin', arrBagItems);

function clearBag(target){
	localStorage.removeItem('bag');
	target.closest('.shopping-bag-content').querySelector('.shopping-bag-wrap')
		.removeChild(document.querySelector('.bag-list'));
	document.querySelector('.shopping-bag__counter').innerHTML = 0;
}
//new
function reloadProductItems(targLi){
	arrBagItems = getLocalBag();
	targLi.closest('.shopping-bag-wrap').removeChild(targLi.parentElement);
	createProductItem(document.getElementById('bag-item-template').innerHTML,
		document.querySelector('.shopping-bag-wrap'), 'afterBegin', arrBagItems);
}

function removeItem(target){
	let targLi = target.closest('.bag-item');
	let targId = +(targLi.dataset.idbagitem);
	let quantity = target.closest('.bag-item__content-wrap').querySelector('.remove-quantity').value;
	let localBag = getLocalBag();
	if(localBag[targId].quantity != 1){
		localBag[targId].quantity -= +quantity < 0  ? quantity *= -1 : quantity;
		
		targLi.querySelector('.bag-item__quantity span').innerHTML = localBag[targId].quantity;
		if(localBag[targId].quantity <= 0) localBag.splice(targId, 1);
		setLocalBag(localBag);//new
		reloadProductItems(targLi);
	}else{
		localBag.splice(targId, 1);
		/* targLi.parentElement.removeChild(targLi); было */ 
		setLocalBag(localBag);//new
		reloadProductItems(targLi);//new
	}
	//setLocalBag(localBag);
}

function createMessageAfterBuy(){
	let div = document.createElement('div'),
		p = document.createElement('p');

	div.setAttribute('class','shopping-bag__messageAfterEmpty');
	p.innerText = 'Thank you for your purchase';
	div.appendChild(p);
	document.querySelector('.shopping-bag-wrap').insertBefore(div, document.querySelector('.shopping-bag__messageAfterEmpty'));
}

document.querySelector('.shopping-bag-content').addEventListener('click',(e)=>{
	let target = e.target;

	if(target.className == 'bag-footer__controls-empty-bag'){
		clearBag(target);
	}else if(target.className == 'bag-item__remove-btn'){
		removeItem(target);
		updateAllCounters();
	}else if(target.className == 'bag-footer__button btn'){
		clearBag(target);
		createMessageAfterBuy();
		updateAllCounters();
	}
});