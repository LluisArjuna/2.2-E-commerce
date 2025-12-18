
// Exercise 6
const validate = () => {
	let error = 0;
	// Get the input fields
	const fName = document.getElementById("fName");
	const fEmail = document.getElementById("fEmail");
	const fAddress = document.getElementById("fAddress");
	const fLastN = document.getElementById("fLastN");
	const fPassword = document.getElementById("fPassword");
	const fPhone = document.getElementById("fPhone");

	// Get the error elements
	const errorName = document.getElementById("errorName");
	const errorEmail = document.getElementById("errorEmail");  
	const errorAddress = document.getElementById("errorAddress");
	const errorLastN = document.getElementById("errorLastN");
	const errorPassword = document.getElementById("errorPassword");
	const errorPhone = document.getElementById("errorPhone");
	
	// Validate fields entered by the user: name, phone, password, and email
	if(fName.value.trim() == "" || fName.value.length < 3 || !/^[a-zA-Z]+$/.test(fName.value)){
		errorName.style.display = "block";
		error++;
	} else {
		errorName.style.display = "none";
	}

	if(fEmail.value == "" ||  fEmail.value.length < 3 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fEmail.value)){
		errorEmail.style.display = "block";
		error++;
	} else {
		errorEmail.style.display = "none";
	}

	if(fAddress.value == "" ||  fAddress.value.length < 3){
		errorAddress.style.display = "block";
		error++;
	} else {
		errorAddress.style.display = "none";
	}

	if(fLastN.value.trim() == "" || fLastN.value.length < 3 || !/^[a-zA-Z]+$/.test(fLastN.value)){
		errorLastN.style.display = "block";
		error++;
	} else {
		errorLastN.style.display = "none";
	}

	if(fPassword.value.trim() == "" || fPassword.value.length < 3 || !/^(?=.*[0-9])(?=.*[A-Za-z])[A-Za-z0-9]+$/.test(fPassword.value)){
		errorPassword.style.display = "block";
		error++;
	} else {
		errorPassword.style.display = "none";
	}

	if(fPhone.value.trim() == "" || fPhone.value.length < 3 || !/^\d+$/.test(fPhone.value)){
		errorPhone.style.display = "block";
		error++;
	} else {
		errorPhone.style.display = "none";
	}
	 
	if(error>0){
		alert("Please fill in all required fields.");
	}else{
		alert("Form submitted successfully");
	}
}