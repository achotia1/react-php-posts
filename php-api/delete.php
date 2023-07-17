<?php
	//including the database connection file
	include_once ("headers.php");
	include_once("classes/Crud.php");
	error_reporting(0);

	$data = file_get_contents('php://input');
	$data = json_decode($data);

	$crud = new Crud();
 	$jsonData = [];

	$id = $crud->my_real_escape_string($data->id);

	$inData['status'] = 2;
	$inData['query'] = "UPDATE user_has_posts SET status=:status WHERE id=:id";
	$optional = array("id" => $id);
	
	//updating the table
	$result = $crud->insertUpdateDelete($inData, $optional);
	if($result['status'] === true){
		$jsonData['status'] = true;
		$jsonData['posts'] = $data;
		$jsonData['msg'] = 'Post Deleted successfully.'; 
	}else{
		$jsonData['status'] = false;
		$jsonData['msg'] = $result['msg']; 
	}
	
	echo json_encode($jsonData);
	exit();
?>