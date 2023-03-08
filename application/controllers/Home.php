<?php
header('Access-Control-Allow-Origin: *');
class Home extends CI_Controller
{
    public function __construct() {
        parent::__construct();
        $this->load->model('AuthModel');
        $this->load->model('GlobalModel');
    }



    public function index() {
      $shop = $this->input->get('shop');
      $shopifydata['api_key'] = $this->config->item('shopify_api_key');
      $shopifydata['shop'] = $shop;

      $shopid = getShopIdby_shop($shop);
      $getdata = $this->GlobalModel->GetSettingData($shopid);
      $shopifydata['show_on_cart'] = $getdata->show_on_cart;
      if(isset($_GET['host'])){
        $shopifydata['host'] = $_GET['host'];
      }else{
        $shopifydata['host'] = '';
      }
      $this->load->view('layouts/header',$shopifydata);
      $this->load->view('home/home');
      $this->load->view('layouts/footer');
    }

    public function getOrders() {
      $shop = $this->input->get('shop');
      $shopAccess = getShop_accessToken_byShop($shop);
      $this->load->library('Shopify', $shopAccess);
      $isValid = IsValidRequest();
      if($isValid['code'] == 200){
        $limit = $this->input->get('length');
        $fields = 'id,name,created_at,customer,note_attributes,total_price';
        $orders = $this->shopify->call(['METHOD' => 'GET', 'URL' => 'admin/api/'.getYear().'/orders.json?fields='.$fields], TRUE);
        $orders = $orders->orders;
        $filteredOrders = array();
        foreach ($orders as $order) {
          foreach ($order->note_attributes as $note_attribute) {
            if ($note_attribute->name === 'VW Delivery Date') {
              $order->delivery_date = $note_attribute->value;
              array_push($filteredOrders, $order);
            }
          }
        }
        $response = ['orders' => $filteredOrders];
      }else{
        $response = ['orders' => []];
      }

      json_send($response);
    }

    public function calendar() {
      $shop = $this->input->get('shop');
      $shopifydata['api_key'] = $this->config->item('shopify_api_key');
      $shopifydata['shop'] = $shop;
      $shopid = getShopIdby_shop($shop);
      $getdata = $this->GlobalModel->GetSettingData($shopid);
      $shopifydata['show_on_cart'] = $getdata->show_on_cart;
      $this->load->view('layouts/header',$shopifydata);
      $this->load->view('home/calendar');
      $this->load->view('layouts/footer');
    }

    public function getEvents() {
      $isValid = IsValidRequest();
      if($isValid['code'] == 200){
        $shop = $this->input->get('shop');
        $shopAccess = getShop_accessToken_byShop($shop);
        $this->load->library('Shopify', $shopAccess);
        $fields = 'id,name,created_at,customer,note_attributes,total_price';
        $orders = $this->shopify->call(['METHOD' => 'GET', 'URL' => 'admin/api/'.getYear().'/orders.json?fields='.$fields], TRUE);
        $orders = $orders->orders;

        $events = array();
        foreach ($orders as $order) {
          foreach ($order->note_attributes as $note_attribute) {
            if ($note_attribute->name == 'VW Delivery Date') {
              $old_date = str_replace('/', '-', $note_attribute->value);
              $old_date = strtotime($old_date);
              $new_date = date('Y-m-d', $old_date);
              array_push($events, array('title' => $order->name, 'start' => $new_date, 'order_id' => $order->id));
            }
          }
        }
        json_send($events);
      }else{
        json_send($isValid);
      }
    }

    public function getOrderById() {
      $isValid = IsValidRequest();
      if($isValid['code'] == 200){
        $shop = $this->input->get('shop');
        $order_id = $this->input->post('order_id');
        $shopAccess = getShop_accessToken_byShop($shop);
        $this->load->library('Shopify', $shopAccess);
        $order = $this->shopify->call(['METHOD' => 'GET', 'URL' => 'admin/api/'.getYear().'/orders/'.$order_id.'.json'], TRUE);
        $order = $order->order;
        $order->order_date = $order->created_at;
        foreach ($order->note_attributes as $note_attribute) {
          if ($note_attribute->name === 'VW Delivery Date') {
            $order->delivery_date = $note_attribute->value;
          }
        }
        json_send($order);
      }else{
        json_send($isValid);
      }
    }

    public function changeFeature() {

      $isValid = IsValidRequest();
      if($isValid['code'] == 200){
      $shop         = $this->input->get('shop');
      $show_on_cart = $this->input->post('show_on_cart');
      $shopAccess   = getShop_accessToken_byShop($shop);
      $this->load->library('Shopify', $shopAccess);
      $shopid       = getShopIdby_shop($shop);
      if ($show_on_cart) {
        $scripts = $this->shopify->call(['METHOD' => 'GET', 'URL' => 'admin/api/'.getYear().'/script_tags.json'], TRUE);
        $script_tags = $scripts->script_tags;
        $isScriptTagAvailable = 0;
        foreach ($script_tags as $script_tag) {
          if (strpos($script_tag->src, 'vw-deliverydate.js') !== false) {
              $isScriptTagAvailable = 1;
          }
        }
        if (!$isScriptTagAvailable) {
          $script_data = ["script_tag" => ["event" => "onload","src" => base_url().'assets/js/vw-deliverydate.js']];
          $script_inject = $this->shopify->call(['METHOD' => 'POST', 'URL' => 'admin/api/'.getYear().'/script_tags.json', 'DATA' => $script_data], TRUE);
          $script_tag_id = $script_inject->script_tag->id;
          if ($script_tag_id) {
            $data = array('show_on_cart' => 1);
            $update = $this->db->where('store_id',$shopid)->update('delivery_detail', $data);
            if ($update) {
              json_send(['code' => 200, 'message' => 'Feature Enabled']);
            }
          }
        }
      }else{
        $scripts = $this->shopify->call(['METHOD' => 'GET', 'URL' => 'admin/api/'.getYear().'/script_tags.json'], TRUE);
        $script_tags = $scripts->script_tags;
        $isScriptTagAvailable = 0;
        $scriptTagId = 0;
        foreach ($script_tags as $script_tag) {
          if (strpos($script_tag->src, 'vw-deliverydate.js') !== false) {
              $isScriptTagAvailable = 1;
              $scriptTagId = $script_tag->id;
          }
        }
        if ($isScriptTagAvailable && $scriptTagId) {
          $script_delete = $this->shopify->call(['METHOD' => 'DELETE', 'URL' => 'admin/api/'.getYear().'/script_tags/'. $scriptTagId .'.json'], TRUE);
          if ($script_delete) {
            $data = array('show_on_cart' => 0);
            $update = $this->db->where('store_id',$shopid)->update('delivery_detail', $data);
            if ($update) {
              json_send(['code' => 200, 'message' => 'Feature Disabled']);
            }
          }
        }
      }
    }else{
      json_send($isValid);
    }

  }

    public function getSettings() {
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
      $disabled_dates             = $getdata->disable_date;
      $disabled_dates             = explode(", ", $disabled_dates);
      $data['disabled_dates']     = $disabled_dates;
      $data['min_date']           = $getdata->min_date;
      $data['max_date']           = $getdata->max_date;
      $data['text_setting']       = unserialize($getdata->text_setting);

      header('Content-Type: application/json');
      echo json_encode($data);
    }


}
