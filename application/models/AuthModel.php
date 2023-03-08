<?php
class AuthModel extends CI_Model {

  function __construct() {
    parent::__construct();
  }

  public function UpdateShopDetails($where = array(), $data = array()) {
      $this->db->where($where)->update('tokenTable', $data);
      return $this->db->affected_rows();
  }

  public function get_shop_details($shop = NULL)
  {
      $shop_details = $this->db->select('charge_id')->where('shop', $shop)->get('tokenTable');
      if ($shop_details->num_rows() > 0) {
          return $shop_details->row();
      } else {
          return false;
      }
  }

  public function save_token($getdata) {
    $this->db->select("*");
    $this->db->from("tokenTable");
    $this->db->where("access_token", $getdata["access_token"]); // will check row by column name in database
    // $this->db->where("shop", $getdata["shop"]); // will check row by column name in database
    $this->result = $this->db->get();

    if ($this->result->num_rows() > 0) {
      // you data exist
      return false;
    } else {
      // data not exist insert you information
      $this->db->insert('tokenTable', $getdata);
      return true;
    }
  }

  public function check($shop) {
    $this->db->select('*');
    $this->db->from('tokenTable');
    $this->db->where('shop', $shop);
    $query = $this->db->get();
    if ($query->num_rows() > 0)
    return $query->result();
  }

  public function check_ShopExist($shop = NULL) {
    $query = $this->db->query("SELECT * FROM `tokenTable` where  shop='" . $shop . "'");
    $rows  = $query->num_rows();
    if ($rows > 0) {
      return TRUE;
    } else {
      return FALSE;
    }
  }

  public function update_Shop($data, $accessToken) {
    if ($accessToken) {
      $shopdata = $this->db->where('shop', $data['shop'])->get('tokenTable')->row();
      $shopid = $shopdata->id;
      $sql = "update tokenTable set access_token='" . $accessToken . "' where  shop='" . $data['shop'] . "' ";
      $this->db->query($sql);
      if ($shopdata->access_token != $accessToken) {
        $this->db->set('show_on_cart', 0)->where('store_id', $shopid)->update('delivery_detail');
      }
    }
  }

  public function add_newShop($data, $accessToken) {
    $storedata = array(
      'shop' => $data['shop'],
      'access_token' => $accessToken
    );
    $this->db->insert('tokenTable', $storedata);
    // $sql = "insert into tokenTable set shop='" . $data['shop'] . "', access_token='" . $accessToken . "' ";
    // $this->db->query($sql);
    $insert_id = $this->db->insert_id();



    $arrser = array(
      'calender_heading'       => 'Please Select Delivery Date',
      'cal_inline_text'        => 'Select Date',
      'cart_required_message'  => 'You Should Select Delivery Date Before Continue'
    );
    $textset = serialize($arrser);
    $settings = array(
      'store_id' => $insert_id,
      'text_setting' => $textset
    );
    $this->db->insert('delivery_detail', $settings);
  }
}
