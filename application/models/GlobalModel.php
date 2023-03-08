<?php
class GlobalModel extends CI_Model{
    function __construct()
    {
        parent::__construct();
    }
    public function GetSettingData($shopid){
      $data = $this->db->select('*')
                       ->from('delivery_detail')
                       ->where('store_id',$shopid)
                       ->get()->row();
      return $data;
    }

    public function save_settings($data,$shopid){
      $setdetail = $this->db->select('*')
                            ->from('delivery_detail')
                            ->where('store_id',$shopid)
                            ->get()->row();
      if (empty($setdetail)) {
        $insert = $this->db->insert('delivery_detail',$data);
        return $insert;
      }else{
        $update = $this->db->where('store_id',$shopid)
                           ->update('delivery_detail',$data);
        return $update;
      }
    }
}
