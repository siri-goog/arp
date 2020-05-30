/* 
Author: sunwit petchoo 101318759
Created : 17/09/2018 
*/
"use strict";

//get species from radio 
function getSpecies()
{
	var speciesName = "unknown";
	var speciesArray = document.getElementById("species").getElementsByTagName("input");
	
	for(var i=0;i<speciesArray.length;i++)
	{
		if(speciesArray[i].checked)
		{
			speciesName = speciesArray[i].value;
		}
	}
	return speciesName;
}
//check species age
function checkSpeciesAge(age)
{
	var errMsg = "";
	var species = getSpecies();
	switch(species)
	{
		case "Human":
		if(age > 120)
		{
			errMsg = "You cannot be a human and over 120. \n";
		}
		break;
		case "Dwarf":
		case "Hobbit":
		if(age > 150)
		{
			errMsg = "You cannot be a "+ species + " and over 150. \n";
		}
		break;
		case "Elf":
		break;
		default:
			errMsg = "we don't allow your kind on our tours. \n";
	}
	return errMsg;
}
//check species beard
function checkSpeciesBeard(age)
{
	var errMsg = "";
	var species = getSpecies();
	var beardLength = document.getElementById("beard").value;
	switch(species)
	{
		case "Dwarf":
		if(age >= 30)
		{
			if(beardLength <12)
			{
				errMsg = "You cannot be a "+age+" years old Dwarf with beard less than 12 inch. \n";
			}
		}
		break;
		case "Elf":
		case "Hobbit":
		if(beardLength != 0)
		{
			errMsg = species + " never have beard. \n";
		}
		break;
		case "Human":
		break;
		default:
			errMsg = "we don't allow your kind on our tours. \n";
	}
	return errMsg;
}
function storeBooking(firstName, lastName, age, species, is1day, is4day, is10day)
{
	var trip = "";
	var arrayTrip = [];
	if(is1day)  arrayTrip.push("1day");
	if(is4day)  arrayTrip.push("4day");
	if(is10day) arrayTrip.push("10day");
	for(var i= 0;i<arrayTrip.length;i++)
	{
		trip+=arrayTrip[i];
		if(i<arrayTrip.length-1)
		{
			trip+=",";
		}
	}
	sessionStorage.trip = trip;
	sessionStorage.firstName = firstName;
	sessionStorage.lastName = lastName;
	sessionStorage.age = age;
	sessionStorage.species = species;
	sessionStorage.food = document.getElementById("food").value;  
	sessionStorage.partySize = document.getElementById("partySize").value;  
	
}
//get input from user and display with alertbox
function validate()
{
	var errMsg = "";
	var result = true;
	var firstName = document.getElementById("firstname").value;
	var lastName = document.getElementById("lastname").value;
	var age = document.getElementById("age").value;
	var is1day = document.getElementById("1day").checked;
	var is4day = document.getElementById("4day").checked;
	var is10day = document.getElementById("10day").checked;
	var isHuman = document.getElementById("human").checked;
	var isDwarf = document.getElementById("dwarf").checked;
	var isElf = document.getElementById("elf").checked;
	var isHobbit = document.getElementById("hobbit").checked;
	var tempMsg = checkSpeciesAge(age);
	var tempMsg2 = checkSpeciesBeard(age);
	var species = getSpecies();
	firstName = firstName.trim();
	lastName = lastName.trim();
	//check first name and last name
	if(!firstName.match(/^[a-zA-Z]+$/))
	{
		errMsg = errMsg + "Your first name must only contain alpha characters\n";
		result =  false;
		
	}if(!lastName.match(/^[a-zA-Z-]+$/))
	{
		errMsg = errMsg + "Your last name must only contain alpha characters or hyphen\n";
		result =  false;
	}
	//check age
	if(isNaN(age))
	{
		errMsg = errMsg + "Your age must be a number\n";
		result = false;
	}else if(age < 18)
	{
		errMsg = errMsg + "Your age must be 18 or older\n";
		result = false;
	}else if(age>=10000)
	{
		errMsg = errMsg + "plese enter appropriate age\n";
		result = false;
	}/* else if(!(age>=1&&age<=100))
	{
		errMsg = errMsg + "Your age must be between 1 and 100\n";
		result = false;
	} */else
	{
		if(tempMsg != "")
		{
			errMsg = errMsg + tempMsg;
			result = false;
		}
	}
	//check food preference
	if(document.getElementById("food").value == "none")
	{
		errMsg = errMsg + "Your age must select a food preference\n";
		result = false;
	}
	//check booking trip
	if(!(is1day||is4day||is10day))
	{
		errMsg += "Please select at least one trip.\n";
		result = false;
	}
	//check species
	if(!(isHuman||isDwarf||isElf||isHobbit))
	{
		errMsg += "Please select at species.\n";
		result = false;
	}
	//check beard length
	if(tempMsg2 != "")
		{
			errMsg = errMsg + tempMsg2;
			result = false;
		}
	if(errMsg!="")
	{
		alert(errMsg);
	}
	if(result)
	{
		storeBooking(firstName, lastName, age, species, is1day, is4day, is10day);
	}
	return result;
	
	
}
//prefill form 
function prefill_form()
{
	if(sessionStorage.firstName != "undefined")
	{
		document.getElementById("firstname").value = sessionStorage.firstName;
		document.getElementById("lastname").value = sessionStorage.lastName;
		document.getElementById("age").value = sessionStorage.age;
		document.getElementById("partySize").value = sessionStorage.partySize;
		document.getElementById(sessionStorage.food).selected = "true";
			

		
		switch(sessionStorage.species){
		case "Human":
		document.getElementById("human").checked = true;
		break;
		case "Elf":
		document.getElementById("elf").checked = true;
		break;
		case "Hobbit":
		document.getElementById("hobbit").checked = true;
		break;
		case "Dwarf":
		document.getElementById("dwarf").checked = true;
		break;
		}
		//prefill for check box 
		var trip = sessionStorage.trip;
		var tripArray = trip.split(",");
		for(var i=0;i<tripArray.length;i++)
		{
			trip = tripArray[i];
			if(trip == "1day")
			{
				document.getElementById("1day").checked = true;
			}if(trip == "4day")
			{
				document.getElementById("4day").checked = true;
			}if(trip == "10day")
			{
				document.getElementById("10day").checked = true;
			}
		}
	}
}
function init()
{
	var regForm = document.getElementById("regform");// get ref to the HTML element 
		regForm.onsubmit = validate;           //register the event listener 
		if(sessionStorage.firstName != undefined)
		{
		prefill_form();
		}
}

window.onload = init;

