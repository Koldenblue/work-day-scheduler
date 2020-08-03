"use strict"

let currentHour = moment().hour();

// Change the text at the top of the page to reflect the current date.
$("#currentDay").text(moment().format("dddd, MMMM Do"));

function save() {
    console.log($(this));
    localStorage.setItem($(this).data("time"), $(this).data("textarea").val());
}


// Assign a time value to each $("textarea") and each $("button") jQuery object. 
// Then assign past, present, or future classes based on the times, and currentHour.
for (let i = 0, j = $("textarea").length, time = 9; i < j; i++, time++) {
    $("textarea").eq(i).data("time", time);
    $("button").eq(i).data("time", time);
    // store a pointer to the associated textarea field on each button:
    $("button").eq(i).data("textarea", $("textarea").eq(i))
    $("button").eq(i).on("click", save);
    
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


for (let i = 0, j = $("textarea").length; i < j; i++) {
    let prevtextarea = localStorage.getItem($("textarea").eq(i).data("time"));
    console.log(prevtextarea);
    if (prevtextarea === null) {
        prevtextarea = "";
    }
    $("textarea").eq(i).text(prevtextarea);
}

