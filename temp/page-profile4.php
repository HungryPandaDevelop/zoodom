<? 
acf_form_head();
get_header(); ?>
<? $slides = carbon_get_the_post_meta( 'crb_detail_slider' );
?>

<div class="main-full">
  <div class="breadcrumbs">
    <?
      bcn_display();
		?>
  </div>
</div>
<?



?>
<div class="content">
  <div class="main-full">
    <h1>
      <? the_title(); ?>
    </h1>
    <?
    $current_user_id = get_current_user_id();
    acf_form([
      'field_groups' => [112],
      'post_id' => 'user_' . $current_user_id,
      'html_before_fields'  =>  '<div class="page main-full profile">',
      'html_after_fields'  =>  '</div>',
    ]);
    ?>
  </div>

  <div class="page main-full profile">
    <div class="profile-item">
      <h2> <b>01. </b><span>Выберите основной вид вашей деятельности</span></h2>
      <form class="form form-grid">
        <div class="checkbox form--col__three">
          <label>Дистрибьютор
            <input type="radio" name="user-group"><span></span>
          </label>
        </div>
        <div class="checkbox form--col__three">
          <label>Питомник
            <input type="radio" name="user-group"><span></span>
          </label>
        </div>
        <div class="checkbox form--col__three">
          <label>Приют
            <input type="radio" name="user-group"><span></span>
          </label>
        </div>
        <div class="checkbox form--col__three">
          <label>Ветклиника
            <input type="radio" name="user-group"><span></span>
          </label>
        </div>
        <div class="checkbox form--col__three">
          <label>Салон
            <input type="radio" name="user-group"><span></span>
          </label>
        </div>
      </form>
    </div>
    <div class="profile-item">
      <h2> <b>02. </b><span>Основная информация</span></h2>
      <form class="form form-grid">
        <input class="input-decorate form--col__three require" type="text" placeholder="Наименование компании">
        <input class="phone-mask input-decorate form--col__three require" type="text"
          placeholder="+7 (___) ___ - __ - __">
        <input class="input-decorate check-mail form--col__three require" type="email" placeholder="Email *">
      </form>
    </div>
    <div class="profile-item">
      <h2> <b>03. </b><span>Фото профиля</span></h2>
      <form class="form form-grid">
        <div class="input-file-container">
          <input class="input-file" type="file" data-multy="0" data-textchoise="Выберете файл" data-hint=""
            accept="image/jpeg,image/png,image/gif">
        </div>
      </form>
    </div>
    <div class="profile-item">
      <h2><b>04. </b><span>Пароль</span></h2>
      <form class="form form-grid">
        <input class="input-decorate form--col__three require" type="text" placeholder="Фио">
        <input class="phone-mask input-decorate form--col__three require" type="text"
          placeholder="+7 (___) ___ - __ - __">
        <input class="input-decorate check-mail form--col__three" type="email" placeholder="Email">
      </form>
    </div>
    <div class="btn-container">
      <a href="#" class="btn profile-save">Сохранить</a>
    </div>
  </div>

</div>

<? get_footer(); ?>