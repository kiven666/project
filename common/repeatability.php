<?php
header('Content-type: text/html;charset=utf-8');

$phonenum = $_REQUEST['phonenum'];      // 通过get请求传递过来的phonenum值


// 创建连接
$conn = new mysqli('localhost', 'root', '', 'library');

$sql = "select phonenum from zhenpin where phonenum='$phonenum'";     // sql语句     查询zhenpin表中的phonenum字段

$conn->query('set names utf8');

$result = $conn->query($sql);


if ($result->num_rows > 0) {

    $phonenum = $result->fetch_assoc();

    $data = array(
        'code' => 0,
        'msg'  => '手机号已存在！',
    );
} else {
    $data = array(
        'code' => 1,
        'msg'  => '可以注册'
    );
}

echo json_encode($data);

$conn->close();