<?php
	include_once 'DbConfig.php';
	class Crud extends DbConfig {

		public function __construct() {
			parent::__construct();
		}

		public function getData($query,$default='') {

			$stmt = $this->conn->prepare($query);
			$stmt->execute();
			if ($stmt == false) {	
				return false;
			}

			if(isset($default) && !empty($default) && $default=='getSingleRecord'){
				return $stmt->fetch(PDO::FETCH_ASSOC);
			}
			return $stmt->fetchAll(PDO::FETCH_ASSOC);
		}

		public function my_real_escape_string($value) {
		   return substr($this->conn->quote($value), 1, -1);       
		}

		public function insertUpdateDelete($inData, $optional) {

			try{
				$outData = [];

				$stmt = $this->conn->prepare($inData['query']);
				if (isset($inData['userId']) && !empty($inData['userId'])) {
					$stmt->bindValue(':userId', $inData['userId']);
				}
				if (isset($inData['name']) && !empty($inData['name'])) {
					$stmt->bindValue(':name', $inData['name']);
				}
				if (isset($inData['description']) && !empty($inData['description'])) {
					$stmt->bindValue(':description', $inData['description']);
				}
				if (isset($inData['status']) && !empty($inData['status'])) {
					$stmt->bindValue(':status', $inData['status']);
				}
				
				if (isset($optional["id"]) && !empty($optional["id"])) {
					$stmt->bindValue(':id', $optional["id"]);
				}

				$stmt->execute();
				if ($stmt == false) {
					$outData['message'] = 'Error: cannot execute the command';
					$outData['status'] = false;
				} else {
					$outData['message'] = 'Success';
					$outData['status'] = true;
				}

				return $outData;
			}catch(Throwable $e){

				$outData['message'] = $e->getMessage();
				$outData['status'] = false;
				return $outData;
				exit;
			}
			
		}

	}
?>