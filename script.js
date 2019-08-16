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
$(".activities legend").after('<label id="actRequired" class="required">Select at least one activity </label>');
$("#actRequired").hide();
$(".activities").append('<p id="totalCost"></p>');
$("#totalCost").hide();
let boxesChecked =0;
$checkboxes.change(function(e){
	disableElements();
	if($(this).prop("checked")){
		let dataCost = parseInt(($(this).attr("data-cost")).replace("$", ""));
		$("#actRequired").hide();
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
		$("#actRequired").show();
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
$('#payment option[value="select method"]').hide();
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

//form validation:
function fieldRequired(inputId, labelId, val, func){
	if(!func(val)){
		inputId.css("border", "1px solid red");
		labelId.show();
	}else{
		inputId.css("border", "2px solid #6F9DDC");
		labelId.hide();
	}
}

//name validation
function isNameValid(name){
	return /^[a-z\s]*$/i.test(name);
} 

$("#name").prev().after('<label id="nameRequired" class="required">Name is required. Only letters.</label>');
const nameRequired = $("#nameRequired");
nameRequired.hide();

$("#name").on("input", function(){
	fieldRequired($("#name"), $("#nameRequired"),$(this).val(), isNameValid);
});

//email validation
function isEmailValid(email){
	return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
} 

$("#mail").prev().after('<label id="emailRequired" class="required">Email required. Email must follow the example: lola@example.com</label>');
const emailRequired = $("#emailRequired");
emailRequired.hide();

$("#mail").on("input", function(){
	fieldRequired($("#mail"), $("#emailRequired"),$(this).val(), isEmailValid);
});

//credit card number validation
function isCCValid(cc){
	return /^\d{13}\d?\d?\d?$/.test(cc);
} 
$("#cc-num").after('<label id="ccRequired" class="required">Please enter a number that is between 13 and 16 digits long.</label>');
const ccRequired = $("#ccRequired");
ccRequired.hide();

$("#cc-num").on("input", function(){
	fieldRequired($("#cc-num"), $("#ccRequired"),$(this).val(), isCCValid);
});

//zip code validation
function isZipValid(zip){
	return /^\d{5}$/.test(zip);
} 
$("#zip").after('<label id="zipRequired" class="required">Zip code required.</label>');
const zipRequired = $("#zipRequired");
zipRequired.hide();

$("#zip").on("input", function(){
	fieldRequired($("#zip"), $("#zipRequired"),$(this).val(), isZipValid);
});

//cvv validation
function isCvvValid(zip){
	return /^\d{3}$/.test(zip);
} 
$("#cvv").after('<label id="cvvRequired" class="required">CVV Required.</label>');
const cvvRequired = $("#cvvRequired");
cvvRequired.hide();

$("#cvv").on("input", function(){
	fieldRequired($("#cvv"), $("#cvvRequired"),$(this).val(), isCvvValid);
});

function checkFields(){
	let checkedActivities = 0;
	let fieldsReady = 0;
	$(".activities input").each(function(){
		if($(this).prop("checked")){
			checkedActivities++;
		}
		else{
			checkedActivities--;
		}
	})
	
	if(!(checkedActivities === -7)){
		fieldsReady++;
	}
	else{
		$("#actRequired").show();
	}
	if((($("#name").val().length > 0) && (isNameValid($("#name").val())))){
		fieldsReady++;
	}
	else{
		$("#name").css("border", "1px solid red");
		nameRequired.show();
	}
	if(($("#mail").val().length > 0)&&(isEmailValid($("#mail").val()))){
		fieldsReady++;
	}
	else if ($("#mail").val().length === 0){
		emailRequired.text("Please enter an email").show();
	}
	else{
		$("#mail").css("border", "1px solid red");
		emailRequired.text("Email required. Email must follow the example: lola@example.com").show();
	}
	if(($("#cc-num").val().length > 0) && (isCCValid($("#cc-num").val()))){
		fieldsReady++;
	}
	else if($("#cc-num").val().length === 0){
			console.log("inside creditCard else if");
			ccRequired.text("Please enter a credit card number").show();
		}
	else{
		$("#cc-num").css("border", "1px solid red");
		ccRequired.text("Please enter a number that is between 13 and 16 digits long.").show();
	}
	if(($("#zip").val().length > 0)&& isZipValid($("#zip").val())){
		fieldsReady++;
	}
	else{
		$("#zip").css("border", "1px solid red");
		zipRequired.show();
	}
	if(($("#cvv").val().length > 0)&& isCvvValid($("#cvv").val())){
		fieldsReady++;
	}
	else{
		$("#cvv").css("border", "1px solid red");
		cvvRequired.show();
	}

	return fieldsReady === 6 ?true:false;

}

$("form button").on("click", function(e){
	if(!checkFields()){
		 e.preventDefault();
	}
})


