<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <script src="<?=base_url( 'assets/js/datepicker.js');?>"></script>
    <link href="<?=base_url('assets/css/delivery.css') ?>" type="text/css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="https://cdn.rawgit.com/dubrox/Multiple-Dates-Picker-for-jQuery-UI/master/jquery-ui.multidatespicker.css">
    <link rel="stylesheet" type="text/css" href="https://code.jquery.com/ui/1.12.1/themes/pepper-grinder/jquery-ui.css">
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
    <script src="https://cdn.rawgit.com/dubrox/Multiple-Dates-Picker-for-jQuery-UI/master/jquery-ui.multidatespicker.js"></script>
  </head>
  <body>
    <form id="settingsform" class="" enctype="multipart/form-data" action="<?=base_url('DeliveryDateController/save_settings?shop='.$shop); ?>" method="post">
      <div class="Polaris-Card product_view">
        <div class="tab-navigacija">
          <ul class="tabs clearfix">
            <li rel="tab1" class="head_tab active">App Settings</li>
            <li rel="tab2" class="head_tabs">General Settings</li>
            <li rel="tab3" class="head_tab">Text/Language Settings</li>
          </ul>
        </div>
        <div id="tab1" class="tab active">
          <div class="Polaris-Card">

            <div class="Polaris-Card__Section">
              <label class="Polaris-Choice">
                <span class="Polaris-Choice__Control">
                  <span class="Polaris-Checkbox">
                    <input id="show_on_thankyou" name="show_on_thankyou" type="checkbox" class="Polaris-Checkbox__Input" aria-invalid="false" role="checkbox" aria-checked="false" value="show_on_thankyou" <?php if(isset($show_on_thankyou) && $show_on_thankyou == 1){ echo "checked"; } ?>>
                    <span class="Polaris-Checkbox__Backdrop">
                    </span>
                    <span class="Polaris-Checkbox__Icon">
                      <span class="Polaris-Icon">
                        <svg class="Polaris-Icon__Svg" viewBox="0 0 20 20" focusable="false" aria-hidden="true">
                          <path d="M8.315 13.859l-3.182-3.417a.506.506 0 0 1 0-.684l.643-.683a.437.437 0 0 1 .642 0l2.22 2.393 4.942-5.327a.437.437 0 0 1 .643 0l.643.684a.504.504 0 0 1 0 .683l-5.91 6.35a.437.437 0 0 1-.642 0"></path>
                        </svg>
                      </span>
                    </span>
                  </span>
                </span>
                <span class="Polaris-Choice__Label">Show selected date in Order Status (Thank You) page</span>
              </label>
            </div>

            <div class="Polaris-Card__Section" id="thankyoupage_preview">
              <div class="Polaris-Card__Header">
                <h2 class="Polaris-Heading">Example preview :</h2>
              </div>
              <img id="thank_page" class="rounded mx-auto d-block" src="assets/img/order_status_page.png">
            </div>

          </div>
        </div>
        <div id="tab2" class="tab">
          <div class="Polaris-Layout">

            <div class="Polaris-Layout__Section Polaris-Layout__Section--secondary">
              <div class="Polaris-Card">
                <div class="Polaris-Card__Section">
                  <div class="Polaris-FormLayout">
                    <div class="Polaris-FormLayout__Item">
                      <div class="Polaris-Labelled__LabelWrapper">
                        <div class="Polaris-Label">
                          <label class="Polaris-Label__Text">Delivery Disable Date</label>
                        </div>
                      </div>
                      <div class="Polaris-Connected">
                        <div class="Polaris-Connected__Item Polaris-Connected__Item--primary">
                          <div class="Polaris-TextField Polaris-TextField--hasValue">
                            <input type="text" name="disable_date" id="date-pick" class="datepicker Polaris-TextField__Input browse-customer-search" aria-invalid="false" autocomplete="off" value="">
                            <div class="Polaris-TextField__Backdrop"></div>
                          </div>
                        </div>
                        <div class="Polaris-Connected__Item Polaris-Connected__Item--connection report-btn">
                          <div class="Polaris-Labelled--hidden">
                            <button type="button" class="Polaris-Button  Polaris-Button--sizeSlim datepicker">
                              <span class="Polaris-Button__Content">
                                <span class="Polaris-Button__Icon">
                                  <span class="Polaris-Icon">
                                    <svg class="Polaris-Icon__Svg" viewBox="0 0 20 20" focusable="false" aria-hidden="true">
                                      <path d="M4 8h12V6H4v2zm9 4h2v-2h-2v2zm-4 0h2v-2H9v2zm0 4h2v-2H9v2zm-4-4h2v-2H5v2zm0 4h2v-2H5v2zM17 4h-2V3a1 1 0 1 0-2 0v1H7V3a1 1 0 1 0-2 0v1H3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z" fill-rule="evenodd"></path>
                                    </svg>
                                  </span>
                                </span>
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="Polaris-Layout mt-2">
            <div class="Polaris-Layout__Section Polaris-Layout__Section--secondary">
              <div class="Polaris-Card">
                <div class="Polaris-Card__Section">
                  <div class="Polaris-FormLayout">
                    <div role="group" class="Polaris-FormLayout--condensed">
                      <div class="Polaris-FormLayout__Items">
                        <div class="Polaris-FormLayout__Item">
                          <div class="Polaris-Labelled__LabelWrapper">
                            <div class="Polaris-Label">
                              <label class="Polaris-Label__Text">Minimum Delivery Interval Days</label>
                            </div>
                          </div>
                          <div class="Polaris-TextField">
                            <input type="number" min="0" name="min_date" value="<?=$min_date; ?>" class="Polaris-TextField__Input" aria-labelledby="TextField39Label" aria-invalid="false">
                            <div class="Polaris-TextField__Backdrop"></div>
                          </div>
                          <div class="Polaris-Labelled__HelpText" id="TextField36HelpText"></div>
                        </div>
                      </div>
                      <div class="Polaris-FormLayout__Items">
                        <div class="Polaris-FormLayout__Item">
                          <div class="Polaris-Labelled__LabelWrapper">
                            <div class="Polaris-Label">
                              <label class="Polaris-Label__Text">Maximum Delivery Days</label>
                            </div>
                          </div>
                          <div class="Polaris-TextField">
                            <input min="0" name="max_date" value="<?=$max_date; ?>" class="Polaris-TextField__Input" aria-labelledby="TextField1Label" aria-invalid="false">
                            <div class="Polaris-TextField__Backdrop"></div>
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
        <div id="tab3" class="tab">
          <div class="Polaris-Layout">
            <div class="Polaris-Layout__Section Polaris-Layout__Section--secondary">
              <div class="Polaris-Card">
                <div class="Polaris-Card__Header">
                  <h2 class="Polaris-Heading">Calendar Text</h2>
                </div>
                <div class="Polaris-Card__Section">
                  <div class="Polaris-FormLayout">
                    <div class="Polaris-FormLayout__Item">
                      <div class="Polaris-Labelled__LabelWrapper">
                        <div class="Polaris-Label">
                          <label class="Polaris-Label__Text">Calendar Heading</label>
                        </div>
                      </div>
                      <div class="Polaris-TextField">
                        <input type="text" name="calender_heading" value="<?=$text_setting['calender_heading']; ?>" class="Polaris-TextField__Input" placeholder="Add heading which show as title" aria-labelledby="TextField7Label" aria-invalid="false">
                        <div class="Polaris-TextField__Backdrop"></div>
                      </div>
                    </div>
                    <div class="Polaris-FormLayout__Item">
                      <div class="Polaris-Labelled__LabelWrapper">
                        <div class="Polaris-Label">
                          <label class="Polaris-Label__Text">Calendar In-line</label>
                        </div>
                      </div>
                      <div class="Polaris-TextField">
                        <input type="text" name="cal_inline_text" value="<?=$text_setting['cal_inline_text']; ?>" placeholder="Enter calendar in-line" class="Polaris-TextField__Input" aria-labelledby="TextField8Label" aria-invalid="false">
                        <div class="Polaris-TextField__Backdrop"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="Polaris-Layout__Section Polaris-Layout__Section--secondary">
              <div class="Polaris-Card">
                <div class="Polaris-Card__Header">
                  <h2 class="Polaris-Heading">Message Text</h2>
                </div>
                <div class="Polaris-Card__Section">
                  <div class="Polaris-FormLayout">
                    <div class="Polaris-FormLayout__Item">
                      <div class="Polaris-Labelled__LabelWrapper">
                        <div class="Polaris-Label">
                          <label class="Polaris-Label__Text">Required Message Text</label>
                        </div>
                      </div>
                      <div class="Polaris-TextField">
                        <input type="text" name="cart_required_message" value="<?=$text_setting['cart_required_message']; ?>" class="Polaris-TextField__Input" aria-labelledby="TextField7Label" aria-invalid="false" placeholder="Add required validation message">
                        <div class="Polaris-TextField__Backdrop"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button type="submit" id="setdata" class="Polaris-Button Polaris-Button--primary">
          <span class="Polaris-Button__Content">
            <span class="Polaris-Button__Text">
              Save Changes
            </span>
          </span>
        </button>
      </div>
    </form>

    <script>
    var disable_dates = <?=$disabled_dates; ?>;
      $('#date-pick').multiDatesPicker({
        minDate: 0,
        dateFormat: 'dd/mm/yy',
        addDates: disable_dates
      });
      $('#settingsform').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
          type: 'post',
          url: "<?=base_url('DeliveryDateController/save_settings?shop='.$shop); ?>",
          data: $('form').serialize(),
          success: function (data) {
            // alert(data.msg);
            if(data.code == 200){
              window.ShowSuccesToastToast(data.msg);
            }else{
              window.ShowErrorToast(data.msg);
              location.reload();
            }
          }
        });

      });
    </script>
  </body>
</html>
