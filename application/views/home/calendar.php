<div class="Polaris-Page Polaris-Page--fullWidth">
  <div class="Polaris-Page__Content">
    <div class="Polaris-Layout">
      <div class="Polaris-Layout__AnnotatedSection">
        <div class="Polaris-Layout__AnnotationWrapper">
          <div class="Polaris-Layout__AnnotationContent">
            <div class="Polaris-Card">
              <div class="Polaris-Card__Section">
                <div id='vw-calendar'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Event Modal -->
  <div id="eventmodal" class="modal fade" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Order Details</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="Polaris-Card" style="box-shadow: none;">
            <div class="Polaris-Card__Section">
              <div class="Polaris-FormLayout">
                <div role="group" class="Polaris-FormLayout--condensed">
                  <div class="Polaris-FormLayout__Items">
                    <div class="Polaris-FormLayout__Item" style="flex:0;">
                      <div class="Polaris-Labelled__LabelWrapper">
                        <div class="Polaris-Label"><label class="Polaris-Label__Text order_number">Number</label></div>
                      </div>
                    </div>
                    <div class="Polaris-FormLayout__Item">
                      <div class="Polaris-TextField Polaris-TextField--hasValue">
                        <div class="Polaris-Label"><label class="Polaris-Label__Text event_order_name"><a id="order_name" class="Polaris-Link" target="_blank"></a></label></div>
                      </div>
                    </div>
                  </div>
                  <div class="Polaris-FormLayout__Items">
                    <div class="Polaris-FormLayout__Item" style="flex:0;">
                      <div class="Polaris-Labelled__LabelWrapper">
                        <div class="Polaris-Label"><label class="Polaris-Label__Text order_date">Date</label></div>
                      </div>
                    </div>
                    <div class="Polaris-FormLayout__Item">
                      <div class="Polaris-TextField Polaris-TextField--hasValue">
                        <div class="Polaris-Label"><label id="order_date" class="Polaris-Label__Text event_order_date"></label></div>
                      </div>
                    </div>
                  </div>
                  <div class="Polaris-FormLayout__Items">
                    <div class="Polaris-FormLayout__Item" style="flex:0;">
                      <div class="Polaris-Labelled__LabelWrapper">
                        <div class="Polaris-Label"><label class="Polaris-Label__Text order_customer">Customer</label></div>
                      </div>
                    </div>
                    <div class="Polaris-FormLayout__Item">
                      <div class="Polaris-TextField Polaris-TextField--hasValue">
                        <div class="Polaris-Label"><label id="order_customer_name" class="Polaris-Label__Text event_order_customer"></label></div>
                      </div>
                    </div>
                  </div>
                  <div class="Polaris-FormLayout__Items">
                    <div class="Polaris-FormLayout__Item" style="flex:0;">
                      <div class="Polaris-Labelled__LabelWrapper">
                        <div class="Polaris-Label"><label class="Polaris-Label__Text">Delivery Date</label></div>
                      </div>
                    </div>
                    <div class="Polaris-FormLayout__Item">
                      <div class="Polaris-TextField Polaris-TextField--hasValue">
                        <div class="Polaris-Label"><label id="order_delivery_date" class="Polaris-Label__Text event_order_delivery_date">Apr 4, 2020 GMT</label></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
  <!-- Event Modal End -->

</div>

<style>
.fc-content{
  cursor: pointer;
}
</style>


<script type="text/javascript">
document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('vw-calendar');

  var interval = setInterval(doStuff, 2000);
  function doStuff() {
    if(window.sessionToken){
      GenCalender()
      clearInterval(interval);
    }
  }

function GenCalender(){
    var calendar = new FullCalendar.Calendar(calendarEl, {
      "plugins": [ 'dayGrid' ],
      "events": "<?=base_url(); ?>home/getEvents?shop=<?=$shop; ?>",
      "eventClick": function(info) {
        var order_id = info.event._def.extendedProps.order_id;
        $.ajax({
          url: "<?=base_url(); ?>home/getOrderById?shop=<?=$shop; ?>",
          type: "POST",
          data: { order_id : order_id },
          dataType: "json"
        }).done(function(msg) {
          if(msg.code){
            window.ShowErrorToast(msg.msg);
            window.GenerateSessionToken();
          }else{
            $("#order_name").text(msg.name);
            $("#order_date").text(msg.order_date);
            $("#order_customer_name").text(msg.customer.first_name + " " + msg.customer.last_name);
            $("#order_delivery_date").text(msg.delivery_date);
            $('#eventmodal').modal('show');
          }
        }).fail(function(jqXHR, textStatus) {
        });
      }
    });
    calendar.render();
  }
});
</script>
