<?php
// 设置编码，中文会被编码
header("Content-Type:application/json; charset=utf8");
// header("Content-Type:text/html; charset=utf8");

/* JSON demo
$json_data = array('count'=>2, "results"=>array(
		array('id'=>'0001', 'value'=>'654545'),
		array('id'=>'0002', 'value'=>'798465')
	));
*/


/**
 * 生成本地 json 文件
 */
/*
$lists = array(
		array('id'=>'0001', 'value'=>'654545'),
		array('id'=>'0002', 'value'=>'798465'),
		array('id'=>'0003', 'value'=>'789455')
	);
$json_data['count'] = count($lists);
$json_data['results'] = $lists;


echo json_encode($json_data);

// 写入文件  
file_put_contents('data.json', json_encode($json_data));

*/


$bike_num = isset($_POST['bike_num']) ? htmlentities($_POST['bike_num']) : '';
$bike_pwd = isset($_POST['bike_pwd']) ? htmlentities($_POST['bike_pwd']) : '';


if($bike_num === '' || $bike_pwd === '') {
	header("HTTP/1.1 400 Bad Request");
	echo '{"status_code": 400, "message": "非法请求"}';
	exit();
} else {
	// 文件路径
	$filePath = './ofo_data.json';

	// 判断文件是否存在
	if(file_exists($filePath)) {
		$file_contents = file_get_contents($filePath);
		$data = json_decode($file_contents, true);
		// 获取所有 'id' 字段 组成新数据
		foreach($data['results'] as $val) {
			$arr_id[] = $val['id'];
		}
		// print_r($arr_id);
		if(in_array($bike_num, $arr_id)) {
			// 记录存在， 更新当前值
			$key = array_search($bike_num, $arr_id); 		// 获取当前索引
			$arr_pwd = $data['results'][$key]['value'];
			if(in_array($bike_pwd, $arr_pwd)) {
				// 新密码已存在
				// exit('新密码已存在');
				header("HTTP/1.1 400 Bad Request");
				echo '{"status_code": 400, "message": "新密码已存在"}';
				exit();
			} else {
				// 新密码不存在
				array_push($data['results'][$key]['value'], $bike_pwd); 	// 插入新密码
			}
		} else {
			// 记录不存在，插入一条新账号数据
			array_push($data['results'], array('id'=>$bike_num, 'value'=>array($bike_pwd)));
		}


		// 设置总记录
		$data['count'] = count($data['results']);
		// 转成 JSON 格式
		$json_data = json_encode($data);
		// 输出数据
		print_r($json_data);
		// 数据写入本地 json 文件
		file_put_contents($filePath, $json_data);

	} else {
		$data = array('count'=>1, "results"=>array(
			array('id'=>$bike_num, 'value'=>array($bike_pwd))
		));
		// 转成 JSON 格式
		$json_data = json_encode($data);
		// 输出数据
		echo $json_data;
		// 数据写入本地 json 文件
		file_put_contents($filePath, $json_data);
	}
}

?>







