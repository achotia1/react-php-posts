<?php

	//including the database connection and header file
    include_once ("headers.php");
	include_once ("classes/Crud.php");
	$data = file_get_contents('php://input');
	$data = json_decode($data);
	$page_number = $data->currentPage;
	$limit 	= $data->pageLimit;
 	$jsonData = [];
	error_reporting(0);
	
    $crud = new Crud();
	$userId = $crud->my_real_escape_string($data->userId);
	
	$where = " WHERE userId='".$userId."' AND status=1 ";
	if(!empty($data->searchPost)){
		$searchPost = trim($data->searchPost);
		if(!empty($searchPost)){
			$where .= " AND name like '%".$searchPost."%'";
		}
		$page_number = 1;
		//$limit = 100;
	}
	
	$offset = ($page_number-1) * $limit; 

	$whereCount = $where;
	$where .= " LIMIT ".$offset.",".$limit;

	$query = "SELECT * from user_has_posts ".$where;
	$result = $crud->getData($query);

	$queryCount = "SELECT count(1) as totalRecords from user_has_posts ".$whereCount;
	$resultCount = $crud->getData($queryCount,'getSingleRecord');

	$jsonData['status'] = true;
	$jsonData['posts'] = $result;
	$jsonData['currentPage'] = $page_number;
	$jsonData['totalPages'] = ceil ($resultCount['totalRecords']/$limit);
	$jsonData['totalRecords'] = (int)$resultCount['totalRecords'];
	$jsonData['message'] = 'Post data.'; 
		
	echo json_encode($jsonData,true);
	exit();
?>