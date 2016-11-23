<?php
// 设置编码，中文会被编码
// header("Content-Type:application/json; charset=utf8");
header("Content-Type:text/html; charset=utf8");



// 文件路径
$filePath = 'https://segmentfault.com/q/1010000002482892';
$file_contents = file_get_contents($filePath);
print_r($file_contents);




