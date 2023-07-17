<?php
	//including the database connection and header file
	include_once ("headers.php");
	include_once ("classes/Crud.php");
	include_once ("classes/Validation.php");
	error_reporting(0);

	$data = file_get_contents('php://input');
	$data = json_decode($data);

	$crud 		= new Crud();
	$validation = new Validation();
 	$jsonData 	= [];
 	$inData 	= [];

 	$inData['userId'] 		=  $crud->my_real_escape_string($data->userId);
 	$inData['name']         =  $crud->my_real_escape_string($data->name);
 	$inData['description'] 	=  $crud->my_real_escape_string($data->description);
 	$inData['status'] 		=  1;
 	
	$query = "INSERT INTO user_has_posts(userId, name, description, status) VALUES(:userId, :name, :description, :status)";
	$inData['query'] 		=  $query;

	$optional = array();

	$message = $validation->check_empty($inData, array('name', 'description'));

	//checking empty fields
	if ($message) {
		 $jsonData['status'] = false;
		 $jsonData['message'] = $message;
	} else {
		//updating the table
		$result = $crud->insertUpdateDelete($inData, $optional);
		if($result['status'] === true){
			$jsonData['status'] = true;
			$jsonData['message'] = 'Post added successfully.'; 
		}else{
			$jsonData['status'] = false;
			$jsonData['message'] = $result['message']; 
		}
		
	}

echo json_encode($jsonData);
exit();	
?>