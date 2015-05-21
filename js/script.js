$(document).ready(function(){  

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

	$("#arrow").on("click", function(){
		$.each($("#images option:selected"), function(k, v){
			var file = $("#dates").val() + "/" + $(v).val();
			if($('#selected:contains("' + file + '")').length == 0){
				$("#selected").append("<option data-d=" + $(v).data('d') + " data-h=" + $(v).val() + ">" + file + "</option>");
				//sortSelected();
			}
		});
	});

	function sortSelected(){
		var soptions = $('#selected').sort(function(){
			return (a.data("d") > b.data("d")) ? 1 : -1;
		});
		$("#selected").html(soptions);
	}

	$("#images, #selected").on("mouseover", "option", function(){
		$("#imagePreview").css('background-image', 'url(cam/' + $(this).data("d") + "/" + $(this).data("h") + ".jpg" + ')');
		$("#imagePreview").fadeIn(200);
	});

	$("#images, #selected").on("mouseout", "option", function(){
		$("#imagePreview").hide();
		$("#images, #selected").promise().done(function(){});
	});

	$("#selected").on("keyup", function(e){
		if(e.keyCode == 46){
			$("#selected option:selected").remove();
			/*$.each($("#selected option:selected"), function(){

			}*/
		}
	});
});