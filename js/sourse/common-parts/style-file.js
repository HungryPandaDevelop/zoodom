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