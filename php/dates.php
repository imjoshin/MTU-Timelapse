<?php
$HTML = "<option></option>";
foreach(scandir("../cam/") as $dir){
	if($dir == "." || $dir == ".." || $dir == "blank") continue;
	$date = date("M j, Y", strtotime("20" . substr($dir, -2) . "-" . substr($dir, 0, 5)));
	$HTML .= "<option data-d=$dir>$date</option>";
}

echo $HTML;

?>