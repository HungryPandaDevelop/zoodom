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