<?php
class DbConfig 
{   
    private $_host = 'localhost';
    private $_username = 'root';
    private $_password = '';
    private $_database = 'demo-posts';
    
    protected $connection;
    
    public function __construct()
    {
        
        try {
                if (!isset($this->conn)) {
                    $dsn = 'mysql: host=' . $this->_host . '; dbname=' . $this->_database;
                    $this->conn = new PDO(
                        $dsn, $this->_username, $this->_password,
                        array(
                            PDO::ATTR_ERRMODE, 
                            PDO::ERRMODE_EXCEPTION
                        )
                    ); 

                    if (!$this->conn) {
                        echo 'Cannot connect to database server';
                        exit;
                    }
                }
                return $this->conn;
            } catch(PDOException $e) {
                echo "Connection failed: " . $e->getMessage();
                exit;
            }
    }

    public function __destruct() {
        $conn = null;
    }

}
?>