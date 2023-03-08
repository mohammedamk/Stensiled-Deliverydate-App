<?php

class Auth extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        //Do your magic here
        $this->load->model('AuthModel');
    }

    public function access() {
        $shop = $this->input->get('shop');
        if (isset($shop)) {
            $data = $this->AuthModel->check($shop);
            if ($data) {
                $shop  = $this->input->get('shop');
                $shopAccess = getShop_accessToken_byShop($shop);
                // echo "<pre>";
                // print_r($shopAccess);
                // exit;
                $this->load->library('Shopify', $shopAccess);
                // $this->load->view('layouts/header');
                // $this->load->view('review/index');
                // $this->load->view('layouts/footer');

                // redirect(base_url().'review/create', 'refresh');
                redirect(base_url().'home?shop='.$shop, 'refresh');
            } else {
                $this->auth($shop);
            }
        } else {
            $this->auth($shop);
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

        $scopes = array(
            'read_content', 'write_content', 'read_themes', 'write_themes',
            'read_products', 'write_products', 'read_product_listings',
            'read_orders', 'write_orders', 'read_draft_orders', 'write_draft_orders',
            'read_script_tags', 'write_script_tags'
        );
        $redirect_url = $this->config->item('redirect_url'); //redirect url specified in app setting at shopify
        $paramsforInstallURL = array(
            'scopes' => $scopes,
            'redirect' => $redirect_url
        );

        $permission_url = $this->shopify->installURL($paramsforInstallURL);

        $this->load->view('auth/escapeIframe', ['installUrl' => $permission_url]);
    }

    public function authCallback()
    {
        // print_r('data');
        // exit;
        $code = $this->input->get('code');
        // $code = '';
        $shop = $this->input->get('shop');
        // print_r($shop);
        // exit;
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
        $getdata = array(
            'shop' => $shop,
            'access_token' => $accessToken
        );
        $this->load->model('AuthModel');
        $this->AuthModel->save_token($getdata);
        redirect('https://' . $shop . '/admin/apps');
    }
}
