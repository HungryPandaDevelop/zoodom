// $('.btn-user').on('click',userEdit); 
// /wp-json/wp/v2/users
// function userEdit(e){
//   e.preventDefault();
//   console.log('user edit 2');

//   let infoFromForm = {
//     'first_name': 'illon',
//     'acf': {
//       'name_company': "testimonial"
//     },
//     'password': 'test'
//   }  

//   $.ajax({
//     beforeSend: (xhr)=>{
//       xhr.setRequestHeader('X-WP-Nonce',getData.nonce);
//     },
//     url: getData.root_url+'/wp-json/wp/v2/users/2',
//     data: infoFromForm,
//     type: 'POST',
//     success: (response)=>{
//       console.log('response',response);
      
//     },
//     error: (response)=>{
//       console.log('error',response);
      
//     }
//   });
// }

let mediaEdit = (e)=>{  
  e.preventDefault();
  let file = $('body').find('.cropped')[0].files[0];
  let caption =  $('.cropped').find('.cropped').attr('src');
  console.log('media click val',file);
  
  let formdata = new FormData();

  formdata.append('file',file);
  formdata.append('title','file 371');
  formdata.append('title',caption);

  $.ajax({
      url: getData.root_url+'/wp-json/wp/v2/media/',
      method: 'POST',
      processData: false,
			contentType: false,
        beforeSend: (xhr)=>{
          xhr.setRequestHeader('X-WP-Nonce',getData.nonce);
        },
        data: formdata,
        success: (response)=>{
          console.log('response',response);
          $('.show-file').append('<img src="'+response.source_url+'"/>')
        },
        error: (response)=>{
          console.log('error',response);
          
        }
      });
  
}
$('.btn-user').on('click',mediaEdit); 



console.log('media home');


