
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