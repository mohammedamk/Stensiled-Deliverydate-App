<div class="Polaris-Page Polaris-Page--fullWidth">
  <div class="Polaris-Page__Content">
    <div class="Polaris-Layout">
      <div class="Polaris-Layout__AnnotatedSection">
        <div class="Polaris-Layout__AnnotationWrapper">
          <div class="Polaris-Layout__AnnotationContent">
            <div class="Polaris-Card">
              <div class="Polaris-Card__Section Polaris-Tabs_tabcontent first">
                <div class="Polaris-Card__Section">
                  <div class="Polaris-Card mt-5">
                    <div class="table-responsive">
                      <table id="vw-datatable" class="table">
                        <thead>
                          <tr>
                            <th>Order</th>
                            <th>Date</th>
                            <th>Customer</th>
                            <th>Delivery Date</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<script type="text/javascript">
jQuery(document).ready(function(){
var interval = setInterval(doStuff, 2000);
function doStuff() {
  if(window.sessionToken){
    CreatedataTable()
    clearInterval(interval);
  }
}


function CreatedataTable(){
    $('#vw-datatable').DataTable({
      "lengthChange": false,
      "pageLength": 10,
      "searching": false,
      "ordering": false,
      "processing": true,
      // "serverSide": true,
      "ajax": {
        "url": "<?=base_url(); ?>home/getOrders?shop=<?=$shop; ?>",
        "data": function(d) {
          var data = $('#vw-datatable').DataTable().rows().data();
          var last_id = 0;
          if (data.length) {
            var last_id = data[data.length - 1].id;
          }
          d.since_id = last_id;
        },
        "dataSrc": "orders",
      },
      "columns": [
        { "data": 'name' },
        { "data": 'created_at' },
        { "data": 'customer.first_name' },
        { "data": 'delivery_date' },
        { "data": 'total_price' },
      ]
    });
}
});
</script>
