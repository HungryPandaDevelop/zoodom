console.log('rating');
$('.reviews-stars').on('click','i',function(){
  console.log('cl',$(this).index());
  $(this).parent().addClass('selected');
  $('.reviews-stars i').removeClass('active');
  let numRating = ($(this).index()+1);
  $(this).addClass('active');
  $('.com_block_star #rating-'+numRating).addClass('choise').prop('checked', true);
}); 