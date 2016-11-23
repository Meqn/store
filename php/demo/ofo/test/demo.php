<meta charset="UTF-8">  
<?php  
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



/**
 * 读取本地 json 文件
 */

$json_string = file_get_contents('data.json');
$data = json_decode($json_string, true);

print_r($data);
echo '<hr>';

// 插入一条新数据
array_push($data['results'], array('id'=>'0004', 'value'=>'5478954'));
$data['count'] = count($data['results']);



print_r($data);


?>







