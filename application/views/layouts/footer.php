<script>
     $(function() {
         $("#tabs").tabs();
     });
 </script>
 <script src="<?=base_url();?>assets/js/custom.js"></script>

 <script>
 $(document).ready(function() {
     $('#featurechange').change(function(event) {
         var show_on_cart = $(this).is(":checked") ? 1 : 0;
         $.ajax({
             url: "<?=base_url(); ?>home/changeFeature?shop=<?=$shop; ?>",
             type: "POST",
             data: {show_on_cart: show_on_cart},
             dataType: "json"
         }).done(function(msg) {
           if(msg.code == 200){
             window.ShowSuccesToastToast(msg.message);
           }else{
             window.ShowErrorToast(msg.message);
             location.reload();
           }
         }).fail(function(jqXHR, textStatus) {

         });
     });
     $('#stars li').on('mouseover', function() {
         var onStar = parseInt($(this).data('value'), 10);
         $(this).parent().children('li.star').each(function(e) {
             if (e < onStar) {
                 $(this).addClass('hover');
             } else {
                 $(this).removeClass('hover');
             }
         });
     }).on('mouseout', function() {
         $(this).parent().children('li.star').each(function(e) {
             $(this).removeClass('hover');
         });
     });
     $('#stars li').on('click', function() {
         var onStar = parseInt($(this).data('value'), 10);
         var stars = $(this).parent().children('li.star');
         for (i = 0; i < stars.length; i++) {
             $(stars[i]).removeClass('selected');
         }
         for (i = 0; i < onStar; i++) {
             $(stars[i]).addClass('selected');
         }
         var ratingValue = parseInt($('#stars li.selected').last().data('value'), 10);
         $('#rating').val(ratingValue);
         var msg = "";
         if (ratingValue > 1) {
             msg = "Thanks! You rated this " + ratingValue + " stars.";
         } else {
             msg = "We will improve ourselves. You rated this " + ratingValue + " stars.";
         }
         responseMessage(msg);
     });

     function responseMessage(msg) {
         $('.success-box').fadeIn(200);
         $('.success-box div.text-message').html("<span>" + msg + "</span>");
     }
     $("select.select_type_email").change(function() {
         $(".type_email").prop('disabled', $(this).val() == 'hidden');
     });
     $("select.select_type_name").change(function() {
         $(".type_name").prop('disabled', $(this).val() == 'hidden');
     });
     $('#receive_email_for_review').change(function() {
         var $this = $(this);
         if ($this.is(':checked')) {
             $('#receive_email_addr').prop("disabled", false)
         } else {
             $('#receive_email_addr').prop("disabled", true)
         }
     });
 });
 </script>
 </body>

 </html>
