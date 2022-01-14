<? get_header(); ?>




<?

$userNews = new WP_Query([
  'posts_per_page'  =>  -1, // вывести все
  'post_type' =>  'news',
  'order' =>  'DESK', // порядок сортировки
  'author'  => get_current_user_id()
]);

?>

<div class="main-full">
  <div class="breadcrumbs">
    <?
      bcn_display();
		?>
  </div>
</div>
<style>
.page {
  margin: 1em auto;
  max-width: 768px;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  height: 100%;
}

.box {
  padding: 0.5em;
  width: 100%;
  margin: 0.5em;
}

.box-2 {
  padding: 0.5em;
  width: calc(100%/2 - 1em);
}

.options label,
.options input {
  width: 4em;
  padding: 0.5em 1em;
}

.btn {
  background: white;
  color: black;
  border: 1px solid black;
  padding: 0.5em 1em;
  text-decoration: none;
  margin: 0.8em 0.3em;
  display: inline-block;
  cursor: pointer;
}

.hide {
  display: none;
}

img {
  max-width: 100%;
}
</style>
<main class="page">
  <h2>Upload ,Crop and save.</h2>
  <!-- input file -->
  <div class="box">
    <input type="file" id="file-input">
  </div>
  <!-- leftbox -->
  <div class="box-2">
    <div class="result"></div>
  </div>
  <!--rightbox-->
  <div class="box-2 img-result hide">
    <!-- result of crop -->
    <img class="cropped" src="" alt="">
  </div>
  <!-- input file -->
  <div class="box">
    <div class="options hide">
      <label> Width</label>
      <input type="number" class="img-w" value="300" min="100" max="1200" />
    </div>
    <!-- save btn -->
    <button class="btn save hide">Save</button>
    <!-- download btn -->
    <a href="" class="btn download hide">Download</a>
  </div>
</main>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/cropper/2.3.4/cropper.min.css">
<script src='https://cdnjs.cloudflare.com/ajax/libs/cropperjs/0.8.1/cropper.min.js'></script>
<script>
// vars
let result = document.querySelector('.result'),
  img_result = document.querySelector('.img-result'),
  img_w = document.querySelector('.img-w'),
  img_h = document.querySelector('.img-h'),
  options = document.querySelector('.options'),
  save = document.querySelector('.save'),
  cropped = document.querySelector('.cropped'),
  dwn = document.querySelector('.download'),
  upload = document.querySelector('#file-input'),
  cropper = '';

// on change show image with crop options
upload.addEventListener('change', (e) => {
  if (e.target.files.length) {
    // start file reader
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target.result) {
        // create new image
        let img = document.createElement('img');
        img.id = 'image';
        img.src = e.target.result
        // clean result before
        result.innerHTML = '';
        // append new image
        result.appendChild(img);
        // show save btn and options
        save.classList.remove('hide');
        options.classList.remove('hide');
        // init cropper
        cropper = new Cropper(img);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  }
});

// save on click
save.addEventListener('click', (e) => {
  e.preventDefault();
  // get result to data uri
  let imgSrc = cropper.getCroppedCanvas({
    width: img_w.value // input value
  }).toDataURL();
  // remove hide class of img
  cropped.classList.remove('hide');
  img_result.classList.remove('hide');
  // show image cropped
  cropped.src = imgSrc;
  dwn.classList.remove('hide');
  dwn.download = 'imagename.png';
  dwn.setAttribute('href', imgSrc);
});
</script>



<div class="content">
  <div class="main-full">
    <a href="#" class="btn btn--black btn-user">Клик</a>
    <input type="file" class="btn-file">
    <div class="show-file">

    </div>
    <h1>
      <? the_title(); ?>
    </h1>

  </div>

  <div class="page">
    <div class="main-full">
      <h3>Создать</h3>
      <form class="form form-grid">
        <input class="input-decorate form--col__full require add-item-title" type="text" placeholder="Заголовок">
        <input class="input-decorate form--col__full require add-item-content" type="text" placeholder="Содержание">
        <input type="file" class="file-input">
        <div class="form-btn-container Добавить">
          <input class="btn btn--black btn-send item-add" type="submit" value="Добавить">
        </div>
      </form>
      <h3>Список</h3>

      <?
      while($userNews->have_posts()){
        $userNews->the_post();?>
      <div class="user-item" data-id="<? echo get_the_ID(); ?>">

        <input class="item-title" type="text" value="<? the_title(); ?>">
        <div>
          <textarea class="item-content" name="" id="" cols="30" rows="10"><? the_content(); ?></textarea>

        </div>
        <div>
          <span class="btn btn--black item-update">
            Редактировать
          </span>
          <span class="btn btn--green item-delete">
            Удалить
          </span>
        </div>
      </div>

      <?}
      wp_reset_postdata();
    ?>
    </div>
  </div>

</div>

<? get_footer(); ?>