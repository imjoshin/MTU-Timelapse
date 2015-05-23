$(document).ready(function(){  


	///////////////////////
	// STARTUP PROCESSES //
	///////////////////////

	$.ajax({
		type: 'POST',
		url: 'php/ajax.php',
		async: false,
		data: {
			call: "getDates"
		},
		success: function(output){
			$("#dates").html(output);
		},
		error: function(output){
			alert("An error occured.");
		}
	});



	///////////////
	// LISTENERS //
	///////////////

	$("#dates").on("change", function(){
		$.ajax({
			type: 'POST',
			url: 'php/ajax.php',
			async: false,
			data: {
				call: "getImages",
				date: $("#dates option:selected").data("d")
			},
			success: function(output){
				$("#images").html(output);
			},
			error: function(output){
				alert("An error occured.");
			}
		});
	});

	$("#create").on("click", function(){
		getImages();
		
		$.ajax({
			type: 'POST',
			url: 'php/ajax.php',
			async: false,
			data: {
				call: "create",
				images: getImages(),
				frames: $("#frames").val()
			},
			success: function(output){
				$("#link").html("<a href='" + output + "' target='_blank'>" + output + "</a>");
			},
			error: function(output){
				$("#link").html(output);
				alert("An error occured.");
			}
		});		
	});

	$("#arrow").on("click", function(){
		$.each($("#images option:selected"), function(k, v){
			var file = $("#dates").val() + "/" + $(v).val();
			if($('#selected:contains("' + file + '")').length == 0){
				$("#selected").append("<option data-d=" + $(v).data('d') + " data-h=" + $(v).val() + ">" + file + "</option>");
				//sortSelected();
			}
		});
	});

	$("#images, #selected").on("mouseover", "option", function(){
		$("#imagePreview").css('background-image', 'url(cam/' + $(this).data("d") + "/" + $(this).data("h") + ".jpg" + ')');
		//$("#imagePreview").fadeIn(300);
		$("#imagePreview").show();
	});

	$("#images, #selected").on("mouseout", "option", function(){
		$("#imagePreview").hide();
		$("#images, #selected").promise().done(function(){});
	});

	$("#selected").on("keyup", function(e){
		if(e.keyCode == 46)
			$("#selected option:selected").remove();
	});

	$("#frames").on("keyup", function(){
		$("#frames").value = $("#frames").value.replace(/[^0-9]/g, '');
	});

	$("#presets").on("click", function(){
		$("#presetDialog").dialog("open");
	})

	$("#presetDialog").dialog({
		title: "Presets",
		autoOpen: false,
		position: ['top', 100],
		width: 300,
		height: 400,
		resizable: false,
		buttons: {
			"OK" : function(){
				$("#presetDialog").dialog("close");
			}
		},
		show: {
			effect: "fadeIn",
			duration: 300
		},

		hide: {
			effect: "fadeOut",
			duration: 300
		},
		open: function (e, ui) {
			$(this).parent().find(".ui-dialog-buttonpane .ui-button").addClass("form");
		}	
	});



	///////////////
	// FUNCTIONS //
	///////////////

	function sortSelected(){
		var soptions = $('#selected').sort(function(){
			return (a.data("d") > b.data("d")) ? 1 : -1;
		});
		$("#selected").html(soptions);
	}

	function getImages(){
		var ret = "";
		$.each($("#selected option"), function(k, v){
			ret += $(v).data("d") + "/" + $(v).data("h") + ".jpg" + ",";
		});
		return ret.substring(0, ret.length - 1);
	}
});