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

$json_string = file_get_contents('data2.json');
$data = json_decode($json_string, true);

echo '<hr>';

foreach($data['results'])

if(in_array(array(), $data['results'])) {
	echo '存在';
} else {
	echo "不存在";
}



echo '<hr>';
print_r($data);


?>







