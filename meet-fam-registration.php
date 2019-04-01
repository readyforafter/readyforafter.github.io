<?php
ini_set('display_errors',0);
//  require_once 'inc/MCAPI.class.php';
//  $api = new MCAPI('fece0bb73f71e264e9cfd4b33d29ef3c-us7');
//  
//    
//  $regFname = $_POST['FNAME'];
//  $regLname = $_POST['LNAME'];
//  $regEmail = $_POST['EMAIL'];
//  $regPhone = $_POST['PHONE'];
//    
//    $merge_vars = Array( 
//   
//        'FNAME' => $regFname,
//        'LNAME' => $regLname,
//    'EMAIL' => $regEmail,
//    'PHONE' => $regPhone
//    );
//    $list_id = "5b9932de67";
//  //$list_id = $_POST['List_id'];    
//    $data = $api->listSubscribe($list_id, $_POST['EMAIL'] , $merge_vars );
//print_r($data);
//    if($data === true) {
//        // It worked!   
//        echo "<h4>Thank you, you have been added to our mailing list.</h4>";
//    }else{
//        // An error ocurred, return error message   
//        echo "<h4>Please try again.</h4>";
//       
//    }



     /*$email= $_POST["EMAIL"];

    $api_key = "c5734d46a8c62981b89a1bd609e0909a-us7"; //api key
    $list_id = "5b9932de67"; // list id


      $url = 'https://us15.api.mailchimp.com/2.0/lists/subscribe.json?apikey='.$api_key.'&id='.$list_id.'&email[email]='.$email.'&double_optin=false&send_welcome=false';
    echo callMailchimp($url);
    function callMailchimp($url)
    {
        $ch = curl_init();
        curl_setopt_array($ch, array(
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_SSL_VERIFYHOST => 2
        ));

        $result = curl_exec($ch);
        curl_close($ch);
        return $result;
    }*/

function rudr_mailchimp_subscriber_status( $email, $status, $list_id, $api_key, $merge_fields = array('FNAME' => '','LNAME' => '') ){
  $data = array(
    'apikey'        => $api_key,
        'email_address' => $email,
    'status'        => $status,
    'merge_fields'  => $merge_fields
  );
  $mch_api = curl_init(); // initialize cURL connection
 
  curl_setopt($mch_api, CURLOPT_URL, 'https://' . substr($api_key,strpos($api_key,'-')+1) . '.api.mailchimp.com/3.0/lists/' . $list_id . '/members/' . md5(strtolower($data['email_address'])));
  curl_setopt($mch_api, CURLOPT_HTTPHEADER, array('Content-Type: application/json', 'Authorization: Basic '.base64_encode( 'user:'.$api_key )));
  curl_setopt($mch_api, CURLOPT_USERAGENT, 'PHP-MCAPI/2.0');
  curl_setopt($mch_api, CURLOPT_RETURNTRANSFER, true); // return the API response
  curl_setopt($mch_api, CURLOPT_CUSTOMREQUEST, 'PUT'); // method PUT
  curl_setopt($mch_api, CURLOPT_TIMEOUT, 10);
  curl_setopt($mch_api, CURLOPT_POST, true);
  curl_setopt($mch_api, CURLOPT_SSL_VERIFYPEER, false);
  curl_setopt($mch_api, CURLOPT_POSTFIELDS, json_encode($data) ); // send data in json
 
  $result = curl_exec($mch_api);
  return $result;
}

$api_key = "04226fc047393ea9cd26649cdab08a9b-us20"; //api key
$list_id = "ccbcd434e4"; // list id

//echo $_POST['FNAME']; exit();

if(($_POST['FNAME'] != '') && isset($_POST['FNAME'])){
  $regFname = $_POST['FNAME'];
} else {
  $regFname = '';
}

if(($_POST['MESSAGE'] != '') && isset($_POST['MESSAGE'])){
  $regMessage = $_POST['MESSAGE'];
} else {
  $regMessage = '';
}

if(($_POST['EMAIL'] != '') && isset($_POST['EMAIL'])){
  $regEmail = $_POST['EMAIL'];
} else {
  $regEmail = '';
}
//$regFname = $_POST['FNAME'];
//$regMessage = $_POST['MESSAGE'];
//$regEmail = $_POST['EMAIL'];
//$regPhone = $_POST['PHONE'];
//echo "ffsdfsd".$regFname; exit();
$merge_vars = Array( 

    'FNAME' => $regFname,
    'MESSAGE' => $regMessage,
    'EMAIL' => $regEmail
    //'PHONE' => $regPhone
);

$response = rudr_mailchimp_subscriber_status($_POST["EMAIL"],'subscribed',$list_id, $api_key,$merge_vars  );
$response= json_decode($response);
if(isset($response->status) && $response->status == 'subscribed')
{
    //echo "<h4>Thank you, you have been added to our mailing list.</h4>";
    $resp = 'success';
}
else
{
    //echo "<h4>Please try again.</h4>";
    $resp = 'error';
}
echo json_encode($resp);
?>