
$(document).ready(function(){
	// when the page loads the name input gets focus
	$("#name").focus();

	// when the page loads the other job role input field is hidden
	$("#other-title").hide();

	//hides shirt colors
	$("#colors-js-puns").hide();

	/*The "change" listener is listening to any changes in dropdown menu for job
	role. If the job role selected is equal to other the input field for the job 
	role is shown if not the input field is hidden*/
	$('#title').change(function(){
		if($('#title option:selected').html() === 'Other'){
			$('#other-title').show();
		}
		else{
			$('#other-title').hide();
		}
	})

	/*This function is listening for any changes in the design drop down menu.
	If js puns is selected, the shirts with hearts will not be shown and if the shirts
	with hearts are selected the Js puns will not be shown*/
	$("#design").change(function(e){
		let colorOptions = $("#color option"); //selects all options
		let $puns = $("#color option:nth-child(-n+3)"); //selects puns shirts
		let $hearts = $("#color option:nth-child(n+4)") // selects hearts shirts

		let $selected = $("#design option:selected");
		//if user selects the theme select option the color panel will be hidden.
		if($selected.text() === "Select Theme"){
			$("#colors-js-puns").hide();
		}

		/*If the user selects the heart designs, only heart colors are shown*/
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

		/*If the user selects puns designs, only puns colors are shown*/
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
	//keeps count of total cost of activities;
	let total = 0;

	//selects all checkboxes
	const $checkboxes = $(".activities input");

	//Creates an DOM label for requried activities and hides it
	$(".activities legend").after('<label id="actRequired" class="required">Select at least one activity </label>');
	$("#actRequired").hide();
	//Creates a total cost DOM element and hides it.
	$(".activities").append('<p id="totalCost"></p>');
	$("#totalCost").hide();

	//keeps track of boxes checked.
	let boxesChecked =0;

	//listens for any changes to the checkboxes.
	$checkboxes.change(function(e){
		disableActivities();
		//if an activity is selected, the data cost of that activity 
		//will be added to the total cost. 
		if($(this).prop("checked")){
			//Parses data cost value to a number.
			let dataCost = parseInt(($(this).attr("data-cost")).replace("$", ""));
			$("#actRequired").hide();//hides label once an activity is checked.
			total+=dataCost;
			boxesChecked++;
		}
		else if(!($(this).prop("checked"))){
			//Parses data cost value to a number.
			let dataCost = parseInt(($(this).attr("data-cost")).replace("$", ""));
			//if an activity is unchecked the data cost will be substracted from the total.
			total -=dataCost;
			boxesChecked--;
		}
		//if an activity is checked the total cost will be shown.
		if($(this).prop("checked")){
			$("#totalCost").show();
		}
		//if no checkboxes are selected the total cost label will be hidden and the 
		//act required message will be shown.
		if(boxesChecked === 0){
			$("#totalCost").hide();
			$("#actRequired").show();
		}
		$("#totalCost").text("Total: $" + total);	
	})

	/*disables and enables activities depending on user selection.
	If activity A is scheduled at the same time as activity B and user
	selects activity A, user won't be able to select activity B. B will
	be disabled. */
	function disableActivities(){
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

	//when the page is first loaded the paypal and bicoin options are hidden
	paypal.hide();
	bitcoin.hide();
	//hides select option from drop down menu
	$('#payment option[value="select method"]').hide();

	//listens for any changes in the payment drop down menu. 
	$("#payment").change(function(){
		//If the credit card option is selected the bitcoin and paypal divs will be hidden. 
		if($('#payment option:selected').text() === "Credit Card"){
			creditCard.show();
			paypal.hide();
			bitcoin.hide();
		}
		//If the paypal option is selected the bitcoin and credit card divs will be hidden. 
		else if($('#payment option:selected').text() === "PayPal"){
			paypal.show();
			bitcoin.hide();
			creditCard.hide();
		}
		//If the bitcoin option is selected the credit card and paypal divs will be hidden. 
		else if($('#payment option:selected').text() === "Bitcoin"){
			bitcoin.show();
			paypal.hide();
			creditCard.hide();
		}
		//if no options are selected, the credit card div will be shown as default
		else{
			creditCard.show();
			paypal.hide();
			bitcoin.hide();
		}

	})

//this a general function to avoid repeating code. It displays a red border around
//an item that has some type of error and also prints a message indicating the 
// type of error. If the item doesn't have any errors, item stays the same.
function fieldRequired(inputId, labelId, val, func){
	if(!func(val)){
		inputId.css("border", "1px solid red");
		labelId.show();
	}else{
		inputId.css("border", "2px solid #6F9DDC");
		labelId.hide();
	}
}

//name validation function. If the name field only contains whitespaces
//an error message will be displayed.
function isNameValid(name){
	if(!(name.match(/^ *$/))){
		console.log("inside isNameValid");
		return /^[a-z\s]*$/i.test(name);
	}
	return false;
} 

//creates an error label for the name input and hides it.
$("#name").prev().after('<label id="nameRequired" class="required">Name must contain only letters.</label>');
const nameRequired = $("#nameRequired");
nameRequired.hide();

//calls fieldrequired function dynamically and checks for errors. If errors 
//are found the error label will be shown
$("#name").on("input", function(){
	fieldRequired($("#name"), $("#nameRequired"),$(this).val(), isNameValid);
});

//email validation function
function isEmailValid(email){
	return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
} 

//creates an error label for the email input and hides it.
$("#mail").prev().after('<label id="emailRequired" class="required">Email must follow the example: lola@example.com</label>');
const emailRequired = $("#emailRequired");
emailRequired.hide();

//calls fieldrequired function dynamically and checks for errors. If errors 
//are found the error label will be shown
$("#mail").on("input", function(){
	fieldRequired($("#mail"), $("#emailRequired"),$(this).val(), isEmailValid);
});

//credit card number validation function
function isCCValid(cc){
	return /^\d{13}\d?\d?\d?$/.test(cc);
} 

//creates an error label for the credit card input and hides it.
$("#cc-num").after('<label id="ccRequired" class="required">Please enter a number that is between 13 and 16 digits long.</label>');
const ccRequired = $("#ccRequired");
ccRequired.hide();

//calls fieldrequired function dynamically and checks for errors. If errors 
//are found the error label will be shown
$("#cc-num").on("input", function(){
	fieldRequired($("#cc-num"), $("#ccRequired"),$(this).val(), isCCValid);
});

//zip code validation function
function isZipValid(zip){
	return /^\d{5}$/.test(zip);
}

//creates an error label for the zip code input and hides it.
$("#zip").after('<label id="zipRequired" class="required">Zip code must be a 5 digit number.</label>');
const zipRequired = $("#zipRequired");
zipRequired.hide();

//calls fieldrequired function dynamically and checks for errors. If errors 
//are found the error label will be shown
$("#zip").on("input", function(){
	fieldRequired($("#zip"), $("#zipRequired"),$(this).val(), isZipValid);
});

//cvv validation function
function isCvvValid(zip){
	return /^\d{3}$/.test(zip);
} 
//creates an error label for the cvv input and hides it.
$("#cvv").after('<label id="cvvRequired" class="required">CVV must be a 3 digit number.</label>');
const cvvRequired = $("#cvvRequired");
cvvRequired.hide();

//calls fieldrequired function dynamically and checks for errors. If errors 
//are found the error label will be shown
$("#cvv").on("input", function(){
	fieldRequired($("#cvv"), $("#cvvRequired"),$(this).val(), isCvvValid);
});

/*This function gets called when the form is submitted. It checks all input fields. 
If an input field is empty, an error message is shown.*/
function checkFields(){
	let checkedActivities = 0;
	let fieldsReady = 0;

	//checkts if any of the activities has been checked
	$(".activities input").each(function(){
		if($(this).prop("checked")){
			checkedActivities++;
		}
		else{
			checkedActivities--;
		}
	})
	
	//if at least one activity has been checked no error messages will be displayed
	if(!(checkedActivities === -7)){
		fieldsReady++;
	}
	else{
		$("#actRequired").show();
	}

	//checks if name input is not empty and if it is valid. If any of the conditions
	// are not met, the user will get an error message.
	if((($("#name").val().length > 0) && (isNameValid($("#name").val())))){
		fieldsReady++;
	}
	else if($("#name").val().length ===0){
		nameRequired.text("Please enter your name").show();
	}
	else{
		$("#name").css("border", "1px solid red");
		nameRequired.text("Name must contain only letters.").show();
	}
	//checks if email input is not empty and if it is valid. If any of the conditions
	// are not met, the user will get an error message.
	if(($("#mail").val().length > 0)&&(isEmailValid($("#mail").val()))){
		fieldsReady++;
	}
	else if ($("#mail").val().length === 0){
		emailRequired.text("Please enter an email").show();
	}
	else{
		$("#mail").css("border", "1px solid red");
		emailRequired.text("Email must follow the example: lola@example.com").show();
	}

	//Only checks if the credit card fields have been completed properly if 
	// the credit card or select payment default method have been selected.
	if(($("#payment option:selected").text() === "Select Payment Method") || ($("#payment option:selected").text() === "Credit Card") ){

		//checks if credit card input is not empty and if it is valid. If any of the conditions
		// are not met, the user will get an error message.
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

		//checks if zip code input is not empty and if it is valid. If any of the conditions
		// are not met, the user will get an error message.
		if(($("#zip").val().length > 0)&& isZipValid($("#zip").val())){
			fieldsReady++;
		}
		else if($("#zip").val().length === 0){
			zipRequired.text("Please enter zip code").show();
		}
		else{
			$("#zip").css("border", "1px solid red");
			zipRequired.text("Zip code must be a 5 digit number.").show();
		}

		//checks if cvv input is not empty and if it is valid. If any of the conditions
		// are not met, the user will get an error message.
		if(($("#cvv").val().length > 0)&& isCvvValid($("#cvv").val())){
			fieldsReady++;
		}
		else if($("#cvv").val().length === 0){
			cvvRequired.text("Please enter CVV.").show();

		}
		else{
			$("#cvv").css("border", "1px solid red");
			cvvRequired.text("CVV must be a 3 digit number.").show();
		}
	}
	else{
		fieldsReady+=3;
	}
	//if all the inputs fields have been completed properly the function returns true.
	return fieldsReady === 6 ?true:false;

}

$("form button").on("click", function(e){
	//if all the required fields were not completed correctly, the form will be submitted.
	if(!checkFields()){
		e.preventDefault();
	}
})
})


