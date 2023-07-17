<?php
	//including the database connection file
	include_once ("headers.php");
	include_once("classes/Crud.php");
	include_once("classes/Validation.php");
	error_reporting(0);

	$data = file_get_contents('php://input');
	$data = json_decode($data);

	$crud = new Crud();
	$validation = new Validation();
 	$jsonData = [];
	$inData 	= [];

	$id 					= $crud->my_real_escape_string($data->id);
 	$inData['name']         =  $crud->my_real_escape_string($data->name);
 	$inData['description'] 	=  $crud->my_real_escape_string($data->description);
	$inData['query'] 		= "UPDATE user_has_posts SET name=:name, description=:description WHERE id=:id";
	$optional 				= array("id" => $id);
	
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
			$jsonData['posts'] = $data;
			$jsonData['message'] = 'Post Updated successfully.'; 
		}else{
			$jsonData['status'] = false;
			$jsonData['message'] = $result['message']; 
		}
		
	}
	echo json_encode($jsonData);
	exit();
?>