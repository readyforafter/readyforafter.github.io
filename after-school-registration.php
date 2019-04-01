<?php
	// print_r($_POST);die;
	if (isset($_REQUEST['name2']) && isset($_REQUEST['email2']) && isset($_REQUEST['message2'])) {
	
	//Edit admin mail and subject
	 $admin_email = "hello@after.community"; // < Change this to receive enquiries
	 $subject = "After School- Registration";
	 $email_from = "hello@after.community"; // < From email, needs to be your server email, such as email@yourdomain.com

	 //Sanitize inputs
	 $name2 = filter_var($_REQUEST['name2'], FILTER_SANITIZE_STRING);
	 $email2 = filter_var($_REQUEST['email2'], FILTER_VALIDATE_EMAIL);
	 $message2 = filter_var($_REQUEST['message2'], FILTER_SANITIZE_STRING);
	
	
	 $email_message .= '<html><head><title>After</title></head><body>
		                <table>'; 
	 $email_message .= "<tr><td><b>".'Name : '."</b><td>".$name2.'</td></tr>';
	 $email_message .= "<tr><td><b>".'Email : '."</b><td>".$email2.'</td></tr>';
	 $email_message .= "<tr><td><b>".'Message : '."</b><td>".$message2.'</td></tr>';
	 $email_message .= '</table></body></html>';
	 $email_message .= '<br/>Thank you';


	 $headers =  "From: " . $email_from . "\r\n";
	 $headers .= "Reply-To: ". $email_from . "\r\n";
	 $headers .= "MIME-Version: 1.0\r\n";
	 $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
         

	if(mail($admin_email,$subject,$email_message,$headers))
	{
	        $msg = array('type'=>'success','message'=>'Message has been sent successfully');
	}
	else
	{
	    $msg = array('type'=>'error','message'=>'Some error occoured please try again later.');
	}

	echo json_encode($msg);
	exit;

} 
?>