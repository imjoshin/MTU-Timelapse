<?php
ini_set('display_errors',1);
ini_set('display_startup_errors',1);
ini_set('error_log', "error.txt");

header('Content-type:image/gif');
include("plugins/GIFEncoder.class.php");
$images = explode(",", $_POST["images"]);
$f = intval($_POST["frames"]);

if($f <= 0 || $f >= 1000)
    $f == 25;

foreach($images as $i){
    //file_put_contents("test.txt", "/var/www/html/MTU-Timelapse/cam/" . $i);
	//$image = imagecreatefromjpeg("/var/www/html/MTU-Timelapse/cam/" . $i);
    $image = imagecreatefromjpeg("../cam/" . $i);

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