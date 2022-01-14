$('.wpcf7-form-control-wrap').each(function(){
  let sizeVal = $(this).find('.wpcf7-form-control').attr('id');
  $(this).addClass(sizeVal);
});