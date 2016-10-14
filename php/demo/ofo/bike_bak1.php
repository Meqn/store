<?php
header("Content-Type:text/html; charset=utf8");

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


$bike_num = $_POST['bike_num'] ? $_POST['bike_num'] : '';
$bike_pwd = $_POST['bike_pwd'] ? $_POST['bike_pwd'] : '';


if($bike_num === '' || $bike_pwd === '') {
	exit('小子，注意你的行为!');
}



// 文件路径
$filePath = './data.json';

// 判断文件是否存在
if(file_exists($filePath)) {
	$file_contents = file_get_contents($filePath);
	$data = json_decode($file_contents, true);
	// 插入一条新数据
	array_push($data['results'], array('id'=>$bike_num, 'value'=>array($bike_pwd)));
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

?>







