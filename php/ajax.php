<?php

	if($_POST["call"] == "getImages"){
		echo getOutput("images.php");
	}


	if($_POST["call"] == "getDates"){
		echo getOutput("dates.php");
	}

	function getOutput($script){
		ob_start();
		include($script);
		$output = ob_get_contents();
		ob_end_clean();
		return $output;
	}

?>