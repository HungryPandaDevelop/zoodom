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

