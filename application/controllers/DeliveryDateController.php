<?php
class DeliveryDateController extends CI_Controller{

    public function __construct(){
        parent::__construct();
        $this->load->model('GlobalModel');
    }

    public function index() {
      $shop = $_GET['shop'];
      $shopifydata['api_key'] = $this->config->item('shopify_api_key');
      $shopifydata['shop'] = $shop;

      $shopdetail = $this->db->select('id')
                         ->from('tokenTable')
                         ->where('shop',$shop)
                         ->get()->row();
      $shopid = $shopdetail->id;

      $getdata = $this->GlobalModel->GetSettingData($shopid);
      $data = array();
      $data['show_on_cart']       = $getdata->show_on_cart;
      $data['show_on_thankyou']   = $getdata->show_on_thankyou;
      // $data['date_format']        = $getdata->date_format;

      if ($getdata->disable_date) {
        $disable_dates              = $getdata->disable_date;
        $disable_dates              = explode(", ", $disable_dates);
        $data['disabled_dates']       = json_encode($disable_dates);
      } else {
        $data['disabled_dates']       = 0;
      }

      $data['min_date']           = $getdata->min_date;
      $data['max_date']           = $getdata->max_date;
      $data['text_setting']       = unserialize($getdata->text_setting);

      $shopifydata['show_on_cart'] = $getdata->show_on_cart;

      // print_r($shopifydata);
      // exit;
      $this->load->view('layouts/header', $shopifydata);
      $this->load->view('delivery/index',$data);
      $this->load->view('layouts/footer');
    }

    public function save_settings() {

      $isValid = IsValidRequest();
      if($isValid['code'] == 200){

      $shop = $_GET['shop'];
      $shopdetail = $this->db->select('id')
                         ->from('tokenTable')
                         ->where('shop',$shop)
                         ->get()->row();
      $shopid = $shopdetail->id;

      $getSettings = $this->GlobalModel->GetSettingData($shopid);
      $script_tag_id = NULL;
      $shopAccess = getShop_accessToken_byShop($shop);
      $this->load->library('Shopify', $shopAccess);

      $arrser = [
        'calender_heading'       => $_POST['calender_heading'],
        'cal_inline_text'        => $_POST['cal_inline_text'],
        'cart_required_message'  => $_POST['cart_required_message']
      ];
      $textset = serialize($arrser);
      $data = [
        'store_id' => $shopid,
        'show_on_thankyou' => isset($_POST['show_on_thankyou']) ? 1 : 0,
        'disable_date' => $_POST['disable_date'],
        'min_date' => $_POST['min_date'],
        'max_date' => $_POST['max_date'],
        'text_setting' => $textset
      ];
      $insert = $this->GlobalModel->save_settings($data,$shopid);
      if ($insert) {
        json_send(['code' => 200, 'msg' => 'Settings Saved Successfully!']);
      }else{
        json_send(['code' => 100, 'msg' => 'Something Went Wrong!']);
      }
    }else{
        json_send($isValid);
      }

    }
}
