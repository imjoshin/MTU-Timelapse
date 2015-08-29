<?php
ini_set('display_errors',1);
ini_set('display_startup_errors',1);
ini_set('error_log', "error.txt");
set_time_limit(0);
ini_set("memory_limit", "-1");

header('Content-type:image/gif');
include("plugins/GIFEncoder.class.php");
$images = explode(",", $_POST["images"]);
$f = intval($_POST["frames"]);
$showTime = $_POST["showTime"];
$resolution = explode("x", $_POST["resolution"]);

$image = imagecreatetruecolor($resolution[0], $resolution[1]); //resized image
$font = "cour";
if($resolution[0] <= 960)
	$font .= "bi";

if($f <= 0 || $f >= 1000)
	$f == 25;

foreach($images as $i){
	//file_put_contents("test.txt", "/var/www/html/MTU-Timelapse/cam/" . $i);
	//$image = imagecreatefromjpeg("/var/www/html/MTU-Timelapse/cam/" . $i);
	$base = imagecreatefromjpeg("../cam/" . $i);
	list($width, $height) = getimagesize("../cam/" . $i);
	if($showTime){
		$black = imagecolorallocate($base, 0, 0, 0);
		$white = imagecolorallocate($base, 255, 255, 255);
		putenv('GDFONTPATH=' . realpath('.'));
		$timestamp = getTime($i);
		ImageFilledRectangle($base, 0, 0, 265, 30, $black);
		imagettftext($base, 16, 0, 10, 22, $white, $font, $timestamp);
	}
	
	if($resolution[0] != 1280)
		imagecopyresized($image, $base, 0, 0, 0, 0, $resolution[0], $resolution[1], $width, $height);
	else
		$image = $base;

	ob_start();
	imagegif($image);
	$frames[] = ob_get_contents();
	$framed[] = $f;
	ob_end_clean();
}

$gif = new AnimatedGif($frames, $framed, 0, 2, 0, 0, 0, 'bin');
$file = genName();
$fp = fopen("../" . $file, "w");
fwrite($fp, $gif->getAnimation());
fclose($fp);
echo $file;

function getTime($i){
	$date = str_replace('-', '/', substr($i, 0, 8));
	$time = str_replace('-', ':', str_replace('.jpg', '', substr($i, 9, 12))) . ":00";
	$stamp = new DateTime("$date $time");
	return date_format($stamp, "Y-m-d H:i:s");
}

function genName(){
	$characters = "0123456789abcdefghijklmnopqrstuvwxyz";
	$ret = "";
	for ($i = 0; $i < 10; $i++) {
		$ret .= $characters[rand(0, strlen($characters) - 1)];
	}
	$ret = "generated/" . date("m-d-y") . "-$ret.gif";
	
	if(file_exists("../$ret"))
		return genName();
	else
		return $ret;
}

?>
