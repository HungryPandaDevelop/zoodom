


let userItem = '.user-item';

$('.page').on('click',userItem+' .item-delete',deleteItem); 
$('.page').on('click',userItem+' .item-update',updateItem); 
$('.item-add').on('click',addItem); 

  
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
    'content': thisItem.find('.item-content').val(),
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
    'img': thisItem.find('.file-input').val(),
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