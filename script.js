// when the page loads the first element in the pg gets focus
$("#name").focus();
$("#other-title").hide();
$("#colors-js-puns").hide();

$('#title').change(function(){
	if($('#title option:selected').html() === 'Other'){
		$('#other-title').show();
	}
})

$("#design").change(function(e){
	let colorOptions = $("#color option");
	let $puns = $("#color option:nth-child(-n+3)");
	let $hearts = $("#color option:nth-child(n+4)")

	let $selected = $("#design option:selected");
	if($selected.text() === "Select Theme"){
		$("#colors-js-puns").hide();
	}
	if($selected.attr("value") === "heart js"){
		$("#colors-js-puns").show();
		colorOptions.each(function(){
			$(this).attr("selected", false);
			if($(this).attr("value") ==="tomato"){
				$(this).attr("selected", true);
			}
		})
		$puns.hide();
		$hearts.show();
	}

	if($selected.attr("value") === "js puns"){
		$("#colors-js-puns").show();
		colorOptions.each(function(){
			$(this).attr("selected", false);
			if($(this).attr("value") ==="cornflowerblue"){
				$(this).attr("selected", true);
			}
		})	
		$puns.show();
		$hearts.hide();
	}
	
})