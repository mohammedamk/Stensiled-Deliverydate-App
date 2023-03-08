<!DOCTYPE html>
<html>

<head>
    <link href="<?php echo base_url('assets/css/main.css') ?>" type="text/css" rel="stylesheet">
    <link href="<?php echo base_url('assets/css/custome.css') ?>" type="text/css" rel="stylesheet">
    <link href="<?php echo base_url( 'assets/css/seaff.css');?>" type="text/css" rel="stylesheet">
    <link rel="stylesheet" href='https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://unpkg.com/@shopify/polaris@4.15.2/styles.min.css"/>
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.20/css/jquery.dataTables.min.css">

    <!-- <script src="https://cdn.shopify.com/s/assets/external/app.js"></script> -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js"></script>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/4.2.0/core/main.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/4.2.0/daygrid/main.min.css">

    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/4.2.0/core/main.min.js" type="text/javascript"></script> -->
    <script src="<?=base_url();?>assets/js/calender.js"></script>


    <script src="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/4.2.0/daygrid/main.min.js" type="text/javascript"></script>
    <script src="https:////cdnjs.cloudflare.com/ajax/libs/headjs/1.0.3/head.load.min.js" type="text/javascript"></script>

    <script type="text/javascript">
        // ShopifyApp.init({
        //     apiKey: '<?php echo $api_key; ?>',
        //     shopOrigin: '<?php echo 'https://'  . $shop; ?>'
        // });

        var _configs = {
            apiKey: '<?=$this->config->item('shopify_api_key'); ?>',
            shop: '<?=$shop?>',
        }
        <?php
        if(isset($host)){
          ?>
          _configs['host']='<?=$host?>';
        <?php }
        ?>
    </script>

    <script type="text/javascript">
    window.GenerateSessionToken = function(){
      var AppBridgeUtils = window['app-bridge-utils'];
      const sessionToken = AppBridgeUtils.getSessionToken(window.app);
      sessionToken.then(function(result) {
        $.ajaxSetup({
          headers: { "Authorization": "Bearer " + result }
        });
        window.sessionToken = result;
      }, function(err) {
          // console.log(err); // Error: "It broke"
      });
    }

    window.ShowErrorToast = function(msg){
      var Toast = window.ShopifyApp.Toast;
      const toastError = Toast.create(window.ShopifyApp.App, {message: msg,duration: 5000,isError: true});
      toastError.dispatch(Toast.Action.SHOW);
    }
    window.ShowSuccesToastToast = function(msg){
      var Toast = window.ShopifyApp.Toast;
      const toastError = Toast.create(window.ShopifyApp.App, {message: msg,duration: 5000});
      toastError.dispatch(Toast.Action.SHOW);
    }

    head.ready("shopifyAppBridgeUtils", function() {
        var shopName = _configs.shop;
        var token = '';
        function initializeApp() {
          var app = createApp({
            apiKey:_configs.apiKey,
            shopOrigin: shopName
          });
          window.app = app;
          window.GenerateSessionToken();
          return app;
        }

        var AppBridge = window['app-bridge'];
        var AppBridgeUtils = window['app-bridge-utils'];
        var createApp = AppBridge.default;
        var actions = AppBridge.actions;

        window.ShopifyApp = {
          App: initializeApp(),
          ShopOrigin: _configs.shop,
          ResourcePicker: actions.ResourcePicker,
          Toast: actions.Toast,
          Button: actions.Button,
          TitleBar: actions.TitleBar,
          Modal: actions.Modal,
          Redirect: actions.Redirect,
          Loading: actions.Loading,
        };
        var ShopifyApp = window.ShopifyApp;
      });
    </script>
    <script type="text/javascript">
      head.load({shopifyAppBridge: "https://unpkg.com/@shopify/app-bridge@1.30"},{shopifyAppBridgeUtils: "https:////unpkg.com/@shopify/app-bridge-utils@1.30"});
    </script>

    <style>
      .fa-calendar-check::before {
        content: "\f274";
      }
      .nav_btn{
        display: flex;
      }
      .setting_btn{
        margin-right: 6px;
      }
    </style>
</head>

<body>
    <section class="review-bg-white review-py-3 ">
        <div class="review-container custom_conainer">
            <div class="review-row">
                <div class="review-col-md-4 nav_btn">
                  <div class="tabs_class" style="--top-bar-background:#00848e; --top-bar-background-lighter:#1d9ba4; --top-bar-color:#f9fafb; --p-frame-offset:0px;">
                    <div class="Polaris-ButtonGroup">
                      <div class="Polaris-ButtonGroup__Item">
                        <a href="<?php echo base_url(); ?>home?shop=<?php echo $shop; ?>" type="button" class="Polaris-Button">
                          <span class="Polaris-Button__Content">
                            <span class="Polaris-Button__Text">Order Listing</span>
                          </span>
                        </a>
                      </div>
                      <div class="Polaris-ButtonGroup__Item">
                        <a href="<?php echo base_url(); ?>delivery?shop=<?php echo $shop; ?>" type="button" class="Polaris-Button">
                          <span class="Polaris-Button__Content">
                            <span class="Polaris-Button__Text">Settings</span>
                          </span>
                        </a>
                      </div>
                      <div class="Polaris-ButtonGroup__Item">
                        <a href="<?php echo base_url(); ?>home/calendar?shop=<?php echo $shop; ?>" type="button" class="Polaris-Button">
                          <span class="Polaris-Button__Content">
                            <span class="Polaris-Button__Text">Calendar</span>
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="switch_class custom-control custom-switch">
                    <input type="checkbox" class="custom-control-input" id="featurechange" <?php if(isset($show_on_cart) && $show_on_cart == 1) { echo "checked"; } ?>>
                    <label class="custom-control-label" for="featurechange"><div class="div_">Show Delivery Date Picker in Cart Page</div></label>
                  </div>
                </div>


            </div>
        </div>
    </section>

<style>
@media (min-width: 992px) {
    .review-container.custom_conainer {
      max-width: 100%!important;
      width: 100%;
      padding: 0 20px;
}
.tabs_class {
    width: 50%;
}
.div_ {
    position: relative;
    top: 7px;
}
.switch_class {
    width: 50%;
    text-align: right;
}
}
.custom-switch .custom-control-label::after {
    top: calc(4px + 2px);
    left: calc(-57px + 2px);
    width: calc(28px - 4px);
    height: calc(28px - 4px);
    background-color: #adb5bd;
    border-radius: 28px;
  }
  .custom-control-input:checked~.custom-control-label::before {
    color: #fff;
    border-color: #007bff;
    background-color: #007bff;
}
.custom-switch .custom-control-input:checked~.custom-control-label::after {
    background-color: #fff;
    -webkit-transform: translateX(22px);
    transform: translateX(22px);
}

.custom-switch .custom-control-label::before {
    left: -60px;
    width: 55px;
    pointer-events: all;
    border-radius: 1.5rem;
}
.custom-control-label::before {
    height: 30px;
  }
</style>
