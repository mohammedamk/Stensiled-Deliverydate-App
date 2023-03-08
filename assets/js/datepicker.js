jQuery(document).ready(function(){
  jQuery('.tabs li').on('click', function(){
    jQuery('.tabs li.active').removeClass('active');
    jQuery(this).addClass('active');

    var selectTab = jQuery(this).attr('rel');

    jQuery('.tab.active').hide(0,tab);

    function tab() {
      jQuery(this).removeClass('active');
      jQuery('#'+selectTab).show(0,function(){
          jQuery(this).addClass('active');
      });
    }
  });

  $('#show_on_thankyou').click(function(){
    if($(this).is(":checked")){
      $("#thankyoupage_preview").css("display", "block");
    }
    else if($(this).is(":not(:checked)")){
      $("#thankyoupage_preview").css("display", "none");
    }
  });
  if($('#show_on_thankyou').is(":not(:checked)")){
    $("#thankyoupage_preview").css("display", "none");
  }
});
