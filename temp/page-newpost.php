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

    acf_form([
      'post_id'		=> 'new_post',
      'field_groups' => [242],
      'post_title'	=> true,
      'post_content'	=> true,
      'new_post'		=> array(
        'post_type'		=> 'news',
        'post_status'	=> 'publish'
      )
    ]);
    ?>
  </div>



</div>

<? get_footer(); ?>