


let owlMain = $('.owl-main');

owlMain.owlCarousel({
  items: 1,
  nav: true,
  dots: true
});

let owlDetail = $('.owl-detail-main');

owlDetail.owlCarousel({
  items: 1,
  nav: true,
  dots: true
});


// img cover start
$('.img-cover').each(function(){
  let imgSrc = $(this).find('img').attr('src');
  //console.log(imgSrc);
  
  $(this).css('background-image', 'url('+imgSrc+')');
});
// img cover file start
 // style input file start

let ObjfieldFile = $('.input-file');
let flagFileMulti;
let textChoise;
let sizeFile;
let nameFile;

function createNewFileContainer(textChoiseParam, flagFileMultiParam, hintParam){
		let inputClone = $('.input-file').clone();
		inputClone.attr('data-flagM', flagFileMultiParam);

		let fileContainer = $('<div class="file-input-container">'+inputClone[0].outerHTML+'</div>')
		let noticeFile = $('<div class="notice-file notice-big-file"><span>Файл слишком большой</span><i></i></div>');
		let docorateFile = $('<div class="file-decorate"><span>'+textChoiseParam+'</span><i></i></div>');
		if(hintParam){
				let hintFile = $('<div class="hint-input-file">'+hintParam+'</div>');
				return fileContainer.append(hintFile).append(docorateFile).append(noticeFile);
		}
		else{
				return fileContainer.append(docorateFile).append(noticeFile);
		}
}

ObjfieldFile.each(function(){
		let appendFlag = 0;
		textChoise = $(this).data('textchoise');
		flagFileMulti = $(this).data('multy');
		textHint = $(this).data('hint');

		$(this).replaceWith(createNewFileContainer(textChoise, flagFileMulti, textHint));

});



$('body').on('click', '.file-decorate', function () {
		console.log('cl');
		let container = $(this).parents('.file-input-container');
		container.find('.input-file').trigger('click');
});

$('body').on('change', '.input-file', function () {
		nameFile = $(this).val().replace(/C:\\fakepath\\/i, '');
		let container = $(this).parents('.file-input-container');
		
		if(nameFile.length>0){
				sizeFile = this.files[0].size;
				if(sizeFile < 500000){
						console.log(nameFile,sizeFile);
						container.find('span').text(nameFile);
						container.addClass('full');

						flagFileMulti = $(this).data('flagm');

						if (flagFileMulti == 1) {
								$(this).parents('.file-input-container').after(createNewFileContainer(textChoise,"1"));
						}
				}
				else{
						console.log('to big');
					$(this).parents('.file-input-container').find('.notice-big-file').addClass('notice-file--show');

					setTimeout(function(){
						$('.notice-big-file').removeClass('notice-file--show');
					},3000);
				}
		}
});

$("body").on("click", ".file-decorate i", function (e) {
		e.stopPropagation();
		flagFileMulti = $(this).data('flagm');
		let container = $(this).parents('.file-input-container');
		if (flagFileMulti == 1) {
				container.remove();
		}
		else{
				container.replaceWith(createNewFileContainer(textChoise,"0"));
		}
});
 // style input file end
// custom-select

$('.style-select').each(function () {
  let firstElOption = $(this).find('option:selected').text();
  let dataText = $(this).data('text');
  let dataClass = $(this).data('class');
  $(this).find('option').each(function(index){
    $(this).attr('data-index',index);
  });
  if(dataText){
      firstElOption = dataText;
  }


  let styleSelectBoxElement = 
    $(`<div class='custom-select ${dataClass}'>
        <span>${firstElOption}</span>
        <ul class='ln'></ul>
        <i></i>
      </div>
    `);

  $(this).before(styleSelectBoxElement).hide();

  $(this).find('option').each(function (index) {
      var optionText = $(this).text();
      $(this).parent().prev().find('ul').append('<li data-index="'+index+'">' + optionText + '</li>');
  });
});

$(".custom-select").on('click', function (e) {
  e.preventDefault();
  if ($(this).hasClass('active')) {
      $(this).removeClass('active');
  } else {
      $('.custom-select').removeClass('active');
      $(this).addClass('active');
  }
});

$('body').on('click', function (evt) {
  if (!$(evt.target).is('.custom-select, .custom-select > *')) {
      $('.custom-select').removeClass('active');
  }
});

let tempSelectVal;
$('.custom-select').on('click', 'li', function () {
  let liIndex = $(this).data('index');
  let parentsEl = $(this).parents('.custom-select');

  if(!tempSelectVal){   
    tempSelectVal = $(this).remove();
  }else{
    $(this).after(tempSelectVal);
    tempSelectVal = $(this).remove();
  }
  
  parentsEl.next().find('option[data-index="'+liIndex+'"]').prop('selected', true);

  parentsEl.find('span').text($(this).text());
});
// custom-select

$('.close-js').on('click', function () {
    $(this).parents('.element-show').removeClass('show');
});
$('.modal-bg').on('click',function(e){
    $(this).parents('.element-show').removeClass('show');
});

$('.element-btn').on('click', function (e) {
    e.preventDefault();
    
    $('.element-show').removeClass('show');
    let activeIndex = $(this).attr('data-element');
    console.log('cl',activeIndex);
    $('[data-element="' + activeIndex + '"].element-show').addClass('show');
});
console.log('rating');
$('.reviews-stars').on('click','i',function(){
  console.log('cl',$(this).index());
  $(this).parent().addClass('selected');
  $('.reviews-stars i').removeClass('active');
  let numRating = ($(this).index()+1);
  $(this).addClass('active');
  $('.com_block_star #rating-'+numRating).addClass('choise').prop('checked', true);
}); 


let userItem = '.user-item';

$('.page').on('click',userItem+' .item-delete',deleteItem); 
$('.page').on('click',userItem+' .item-update',updateItem); 
$('.item-add').on('click',addItem); 

$('.btn-user').on('click',userEdit); 
// /wp-json/wp/v2/users
function userEdit(e){
  e.preventDefault();
  console.log('user edit');

  let infoFromForm = {
    'first_name': 'illon',
    'acf': {
      'name_company': "testimonial"
    },
    'password': 'test'
  }

  $.ajax({
    beforeSend: (xhr)=>{
      xhr.setRequestHeader('X-WP-Nonce',getData.nonce);
    },
    url: getData.root_url+'/wp-json/wp/v2/users/2',
    data: infoFromForm,
    type: 'POST',
    success: (response)=>{
      console.log('response',response);
      
    },
    error: (response)=>{
      console.log('error',response);
      
    }
  });
}

function deleteItem(){
  let thisItem = $(this).parents(userItem);

  let idItem = thisItem.data('id');

  $.ajax({
    beforeSend: (xhr)=>{
      xhr.setRequestHeader('X-WP-Nonce',getData.nonce);
    },
    url: getData.root_url+'/wp-json/wp/v2/news/'+idItem,
    type: 'DELETE',
    success: (response)=>{

      thisItem.remove();
    },
    error: (response)=>{
      console.log('error',response);
      
    }
  });
}

function updateItem(){
  let thisItem = $(this).parents(userItem);
  
  let idItem = thisItem.data('id');

  let infoFromForm = {
    'title': thisItem.find('.item-title').val(),
    'content': thisItem.find('.item-content').val()
  }
  console.log(infoFromForm);

  $.ajax({
    beforeSend: (xhr)=>{
      xhr.setRequestHeader('X-WP-Nonce',getData.nonce);
    },
    url: getData.root_url+'/wp-json/wp/v2/news/'+idItem,
    type: 'POST',
    data: infoFromForm,
    success: (response)=>{
      console.log('ok',response);

    },
    error: (response)=>{

    }
  });
}

function addItem(e){
  e.preventDefault();
 
  
  let thisItem = $(this).parents('form');
  let infoFromForm = {
    'title': thisItem.find('.add-item-title').val(),
    'content': thisItem.find('.add-item-content').val(),
    'status': 'publish'
  }
  console.log('add',infoFromForm);

  $.ajax({
    beforeSend: (xhr)=>{
      xhr.setRequestHeader('X-WP-Nonce',getData.nonce);
    },
    url: getData.root_url+'/wp-json/wp/v2/news/',
    type: 'POST',
    data: infoFromForm,
    success: (response)=>{


      let elId = response.id;
      let elTitle = response.title.rendered;
      let elContent = response.content.rendered;
      console.log('ok',elId,elTitle,elContent);

      let cloneEl = $('.user-item:first').clone();
      cloneEl.data('id',response.id)
      cloneEl.find('.item-title').val(elTitle);
      cloneEl.find('.item-content').val(elContent);
      $('.user-item:first').before(cloneEl);

    },
    error: (response)=>{
      console.log('error',response);
      
    }
  });
}
$('.password-field').on('click','i',changeStatePass);
function changeStatePass(){
  let thisEl = $(this);
  let visibility = thisEl.data('visibility');

  function hidePass(el){
    $('.password-field').find('input').attr('type','text');
    el.data('visibility', true);
  }
  function hidePass(el){
    $('.password-field').find('input').attr('type','password');
    el.data('visibility', false);
  }

  if(visibility){
    showPass(thisEl);
  }else{
    hidePass(thisEl);
  }

}


//# sourceMappingURL=common-dist.js.map