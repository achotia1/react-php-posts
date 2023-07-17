<?php
	//including the database connection and header file
	include_once ("headers.php");
	include_once ("classes/Crud.php");
	include_once ("classes/Validation.php");

	$crud = new Crud();
	$validation = new Validation();
 	$jsonData = [];

 	$username = $crud->my_real_escape_string($_POST['username']);
 	$password = $crud->my_real_escape_string($_POST['password']);
    
    $data = array('username' => $username,'password' => $password);

    $msg = $validation->check_empty($data, array('username', 'password'));
 		
    //checking empty fields
	if ($msg) {
		$jsonData['status'] = false;
	 	$jsonData['message'] = $msg;
	} else {
		//get the table
		$query = "SELECT * FROM `users` where 
		            username='".$username."' AND password='".md5($password)."' AND status=1";
		$result = $crud->getData($query,'getSingleRecord');
		
		if(!empty($result) && count($result)>0){
			$jsonData['status'] = true;
			$jsonData['user'] = $result;
			$jsonData['message'] = 'User Login successfully.'; 
		}else{
			$jsonData['status'] = false;
			$jsonData['token'] = '';
			$jsonData['message'] = 'Invalid Login Credentials'; 
		}
		
	}

echo json_encode($jsonData);
exit();	
?>