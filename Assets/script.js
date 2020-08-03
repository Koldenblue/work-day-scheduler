"use strict"

let currentHour = moment().hour();

// Change the text at the top of the page to reflect the current date.
$("#currentDay").text(moment().format("dddd, MMMM Do"));

// A function that stores text data upon the save button press.
function save() {
    localStorage.setItem($(this).data("time"), $(this).data("textarea").val());
}

// Assign a time value to each $("textarea") and $("button") jQuery object. 
// Then assign past, present, or future classes based on the times, and currentHour.
for (let i = 0, j = $("textarea").length, time = 9; i < j; i++, time++) {
    // store a time value, 9-17, as data on each text area and button:
    $("textarea").eq(i).data("time", time);
    $("button").eq(i).data("time", time);
    // store a pointer to the associated textarea on each button:
    $("button").eq(i).data("textarea", $("textarea").eq(i));
    // finally, add an event listener for the save function to each button:
    $("button").eq(i).on("click", save);
    
    // Change the color of each text area, based upon the time of day:
    if (currentHour > $("textarea").eq(i).data("time")) {
        $("textarea").eq(i).attr("class", "col-md-10 past")
        console.log("past")
    }
    else if (currentHour === $("textarea").eq(i).data("time")) {
        $("textarea").eq(i).attr("class", "col-md-10 present")
        console.log("present")
    }
    else if (currentHour < $("textarea").eq(i).data("time")) {
        $("textarea").eq(i).attr("class", "col-md-10 future")
        console.log("future")
    }
}

// upon loading the page, for each textarea, get the task text from local storage, and put it into the textarea.
for (let i = 0, j = $("textarea").length; i < j; i++) {
    let prevtextarea = localStorage.getItem($("textarea").eq(i).data("time"));
    if (prevtextarea === null) {
        prevtextarea = "";
    }
    $("textarea").eq(i).text(prevtextarea);
}