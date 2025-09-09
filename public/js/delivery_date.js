"use strict";

const dateInput = document.querySelector(".date");

var today = new Date();

// Calculate the mid-date between two days
var midDate = new Date(today);
midDate.setDate(today.getDate() + 4); // 4 days from today is the mid-date between 2 days ahead and 5 days ahead

var dd = String(midDate.getDate()).padStart(2, "0");
var mm = String(midDate.getMonth() + 1).padStart(2, "0"); //January is 0!
var yyyy = midDate.getFullYear();

var midDateString = yyyy + "-" + mm + "-" + dd;
dateInput.value = midDateString;

console.log(midDateString);

//* first day
// Calculate the date 2 days ahead
var twoDaysLater = new Date(today);

twoDaysLater.setDate(today.getDate() + 3);
var dd = String(twoDaysLater.getDate()).padStart(2, "0");
var mm = String(twoDaysLater.getMonth() + 1).padStart(2, "0"); //January is 0!
var yyyy = twoDaysLater.getFullYear();
twoDaysLater = yyyy + "-" + mm + "-" + dd;
dateInput.min = twoDaysLater;
console.log(dateInput.min);

//* last day
// Calculate the date 6 days ahead
var sixDaysLater = new Date(today);
sixDaysLater.setDate(today.getDate() + 6);

var dd = String(sixDaysLater.getDate()).padStart(2, "0");
var mm = String(sixDaysLater.getMonth() + 1).padStart(2, "0");
var yyyy = sixDaysLater.getFullYear();
sixDaysLater = yyyy + "-" + mm + "-" + dd;
dateInput.max = sixDaysLater;
console.log(dateInput.max);
