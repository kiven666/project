<?php
header('Content-type: text/html;charset=utf-8');

$name = $_REQUEST['name'];


// 创建连接
$conn = new mysqli('localhost', 'root', '', 'library');

$conn->query('set names utf8');

$sql = "select username from yanzhen where username='$name'";     // sql语句

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $data = array(
        'code' => 1,
        'msg'  => '用户名已存在'
    );
} else {
    $data = array(
        'code' => 0,
        'msg'  => '可以注册'
    );
}

echo json_encode($data);

$conn->close();