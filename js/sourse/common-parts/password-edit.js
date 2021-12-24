$('.password-field').on('click','i',changeStatePass);
function changeStatePass(){
  let thisEl = $(this);
  let visibility = thisEl.data('visibility');

  let changePass = (el,type,bool) => {
    $('.password-field').find('input').attr('type',type);
    el.data('visibility', bool);
  }

  visibility ? changePass(thisEl,'password', !visibility) : changePass(thisEl,'text', !visibility)

}

