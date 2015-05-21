<?php
	$HTML = "";
	$date = $_POST["date"];
	if($date == "") return;

	foreach(scandir("../cam/$date/") as $file){
		if($file == "." || $file == "..") continue;
		$file = str_replace(".jpg", "", $file);
		$HTML .= "<option data-d=$date data-h=$file>$file</option>";
	}

	echo $HTML;

?>