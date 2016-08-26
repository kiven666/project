<?php
header('Content-type: text/html;charset=utf-8');

$name = $_GET['name'];      // 通过get请求传递过来的name值
$pass  = $_GET['password'];  // 通过get请求传递过来的密码

$pass = md5($pass);


// 创建连接
$conn = new mysqli('localhost', 'root', '', 'library');

$sql = "select a_nickname from l_admin where a_name='$name' and a_pwd='$pass'";     // sql语句     查询l_admin表中的a_nickname字段

$conn->query('set names utf8');

$result = $conn->query($sql);


if ($result->num_rows > 0) {

    $nickname = $result->fetch_assoc();
    $nickname = $nickname['a_nickname'];

    $data = array(
        'code' => 0,
        'msg'  => '登录成功！',
        'data' => array(
            'nickname' => $nickname
        )
    );

    echo json_encode($data);
} else {

    $data = array(
        'code' => 1,
        'msg'  => '用户名或密码错误！'
    );

    echo json_encode($data);
}