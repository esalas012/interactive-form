// when the page loads the first element in the pg gets focus
$("#name").focus();
$("#other-title").hide();
$("#colors-js-puns").hide();



$('#title').change(function(){
	if($('#title option:selected').html() === 'Other'){
		$('#other-title').show();
	}
	else{
		$('#other-title').hide();
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

let total = 0;
const $checkboxes = $(".activities input");
$(".activities").append('<p id="totalCost"></p>');
$("#totalCost").hide();
let boxesChecked =0;
$checkboxes.change(function(e){
	disableElements();
	if($(this).prop("checked")){
		let dataCost = parseInt(($(this).attr("data-cost")).replace("$", ""));
		total+=dataCost;
		boxesChecked++;
	}
	else if(!($(this).prop("checked"))){
		let dataCost = parseInt(($(this).attr("data-cost")).replace("$", ""));
		total -=dataCost;
		boxesChecked--;
	}
	if($(this).prop("checked") && $("#totalCost")){
		$("#totalCost").show();
	}
	if(boxesChecked === 0){
		$("#totalCost").hide();
	}
	$("#totalCost").text("Total: $" + total);	
})

function disableElements(){
	const jsFrameworks = $('[name = "js-frameworks"]');
	const express = $('[name = "express"]');
	const jsLibs = $('[name = "js-libs"]');
	const node = $('[name = "node"]');
	if(jsFrameworks.prop("checked")){
		express.attr("disabled", true);
		express.parent().css("color", "gray");

	}
	else{
		express.attr("disabled", false);
		express.parent().css("color", "black");
	}
	if(express.prop("checked")){
		jsFrameworks.attr("disabled", true);
		jsFrameworks.parent().css("color", "gray");

	}
	else{
		jsFrameworks.attr("disabled", false);
		jsFrameworks.parent().css("color", "black");
	}
	if(jsLibs.prop("checked")){
		node.attr("disabled", true);
		node.parent().css("color", "gray");

	}
	else{
		node.attr("disabled", false);
		node.parent().css("color", "black");
	}
	if(node.prop("checked")){
		jsLibs.attr("disabled", true);
		jsLibs.parent().css("color", "gray");

	}
	else{
		jsLibs.attr("disabled", false);
		jsLibs.parent().css("color", "black");
	}
}
const creditCard = $("#credit-card");
const paypal = $("#credit-card").next();
const bitcoin = paypal.next();
paypal.hide();
bitcoin.hide();
$("#payment").change(function(){
	if($('#payment option:selected').text() === "Credit Card"){
		creditCard.show();
		paypal.hide();
		bitcoin.hide();
	}
	else if($('#payment option:selected').text() === "PayPal"){
		paypal.show();
		bitcoin.hide();
		creditCard.hide();
	}
	else if($('#payment option:selected').text() === "Bitcoin"){
		bitcoin.show();
		paypal.hide();
		creditCard.hide();
	}
	else{
		creditCard.show();
		paypal.hide();
		bitcoin.hide();
	}

})



