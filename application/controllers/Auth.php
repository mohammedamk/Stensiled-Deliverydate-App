<?php

class Auth extends CI_Controller {

  public function __construct() {
    parent::__construct();
    //Do your magic here
    $this->load->model('AuthModel');
  }

  public function check_login() {
    $shop = $this->input->get('shop');
    if (isset($shop)) {
        $this->auth($shop);
    } else {
      echo "Unauthorized Access!";
      exit;
    }
  }

  public function auth($shop) {
    $data = array(
      'API_KEY' => $this->config->item('shopify_api_key'),
      'API_SECRET' => $this->config->item('shopify_secret'),
      'SHOP_DOMAIN' => $shop,
      'ACCESS_TOKEN' => ''
    );
    $this->load->library('Shopify', $data); //load shopify library and pass values in constructor
    $scopes = array('read_orders', 'write_orders','read_script_tags', 'write_script_tags');
    $redirect_url = $this->config->item('redirect_url'); //redirect url specified in app setting at shopify
    $paramsforInstallURL = array(
      'scopes' => $scopes,
      'redirect' => $redirect_url
    );
    $permission_url = $this->shopify->installURL($paramsforInstallURL);
    $this->load->view('auth/escapeIframe', ['installUrl' => $permission_url]);
  }

  public function authCallback() {
    $code = $this->input->get('code');
    $shop = $this->input->get('shop');
    if (isset($code)) {
      $data = array(
        'API_KEY' => $this->config->item('shopify_api_key'),
        'API_SECRET' => $this->config->item('shopify_secret'),
        'SHOP_DOMAIN' => $shop,
        'ACCESS_TOKEN' => ''
      );
      $this->load->library('Shopify', $data); //load shopify library and pass values in constructor
    }
    $accessToken = $this->shopify->getAccessToken($code);
    $this->updateAccess_Token($accessToken);
    if (isset($accessToken)) {
      $this->charge_exist($shop);
      redirect('Auth/home?shop='.$shop);
    } else {
      echo "Unauthorized Access!";
      exit;
    }
  }

  public function updateAccess_Token($accessToken) {
    if ($_GET['shop'] != '') {
      $shopdata = array('shop' => $_GET['shop']);
      $check_shop_exist = $this->AuthModel->check_ShopExist($_GET['shop']);
      if ($check_shop_exist) {
        $this->AuthModel->update_Shop($shopdata, $accessToken);
      } else {
        $this->AuthModel->add_newShop($shopdata, $accessToken);
      }
    }
  }

  public function charge_exist($shop = '') {
    if (!empty($shop)) {
      $shop_details = $this->AuthModel->get_shop_details($shop);
      if ($shop_details) {
        if (empty($shop_details->charge_id)) {
          redirect('Auth/CreateCharge?shop=' . $shop);
        } else {
          redirect('Auth/GetCharge?shop=' . $shop . '&charge_id=' . $shop_details->charge_id);
        }
      } else {
        echo "Unauthorized Access!";
        exit;
      }
    } else {
      echo "Unauthorized Access!";
      exit;
    }
  }

  public function CreateCharge() {
    if (isset($_GET['shop']) && !empty($_GET['shop'])) {
      $shop = $_GET['shop'];

      $shopAccess = getShop_accessToken_byShop($shop);
      $this->load->library('Shopify', $shopAccess);

      $data = array(
        "recurring_application_charge" => array(
          "name" => "Basic Plan",
          "price" => 4.99,
          "return_url" => base_url('Auth/Charge_return_url?shop=' . $shop),
          "trial_days" =>7
        ),
      );
      $year = getYear();
      $charge = $this->shopify->call(['METHOD' => 'POST', 'URL' => '/admin/api/'.$year.'/recurring_application_charges.json', 'DATA' => $data], true);

      if ($charge->recurring_application_charge) {
        $charge = $charge->recurring_application_charge;
        $this->load->view('auth/escapeIframe', ['installUrl'=>$charge->confirmation_url]);
        // redirect($charge->confirmation_url);
      } else {
        echo "Unauthorized Access!";
        exit;
      }
    } else {
      echo "Unauthorized Access!";
      exit;
    }
  }

  public function Charge_return_url() {

    $shop = $_GET['shop'];
    $charge_id = $_GET['charge_id'];
    if (!empty($shop)) {

      $shopAccess = getShop_accessToken_byShop($shop);
      $this->load->library('Shopify', $shopAccess);

      $data = array(
        "recurring_application_charge" => array(
          "id" => $charge_id,
          "status" => "accepted"
        ),
      );
      $year = getYear();
      $charge = $this->shopify->call(['METHOD' => 'POST', 'URL' => '/admin/api/'.$year.'/recurring_application_charges/' . $charge_id . '/activate.json', 'DATA' => $data], true);
      if ($charge) {
        $where = array('shop' => $shop);
        $data1 = array('charge_id' => $charge_id);
        $update = $this->AuthModel->UpdateShopDetails($where,$data1);
        if ($update) {
          redirect('Auth/AppLoader?shop=' . $shop);
        } else {
          $charge = $charge->recurring_application_charge;
          $data['installUrl'] = $charge->confirmation_url;
          $this->load->view('auth/escapeIframe', $data);
        }
      } else {
        echo "Unauthorized Access!";
        exit;
      }
    } else {
      echo "Unauthorized Access!";
      exit;
    }
  }

  public function GetCharge() {
    $shop = $_GET['shop'];
    $charge_id = $_GET['charge_id'];

    if (!empty($shop)) {
      $shopAccess = getShop_accessToken_byShop($shop);
      $this->load->library('Shopify', $shopAccess);
      $year = getYear();
      $charge = $this->shopify->call(['METHOD' => 'GET', 'URL' => '/admin/api/'.$year.'/recurring_application_charges/' . $charge_id . '.json'], true);
      if ($charge) {
        $charge = $charge->recurring_application_charge;
        if ($charge->status != 'active') {
          redirect('Auth/CreateCharge?shop=' . $shop);
        } else {
          redirect('Auth/AppLoader?shop=' . $shop);
        }
      }
    }
  }



  //Home Page Controller
  public function home() {
    $code = $this->input->get('code');
    $shop = $this->input->get('shop');
    if (empty($shop)) {
      echo 'Unauthorized Access!';
      exit;
    }
    $this->AppLoader($shop);
  }

  public function AppLoader($shop='') {
    $shop = $this->input->get('shop');
    if (empty($shop)) {
      echo 'Unauthorized Access!';
      exit;
    }
    if (isset($shop)) {
      $accessData = getShop_accessToken_byShop($shop);
      if (count($accessData) > 0) {
        if ($accessData['ACCESS_TOKEN'] != '') {
          $data['access_token'] = $accessData['ACCESS_TOKEN'];
          // redirect('Home/Dashboard?shop='.$shop);
          redirect('Home/index?shop='.$shop);
        } else {
          echo "Unauthorized Access!";
          exit;
        }
      } else {
        echo "Unauthorized Access!";
        exit;
      }
    } else {
      echo "Unauthorized Access!";
      exit;
    }
  }


}
