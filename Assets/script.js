"use strict"

$("#currentDay").text(moment().format("dddd, MMMM Do"));

let currentHour = moment().hour();

// Assign a time to each $("textarea") jQuery object. 
// Then based on the times, assign past, present, or future classes.
for (let i = 0, j = $("textarea").length, time = 9; i < j; i++, time++) {
    $("textarea").eq(i).data("time", time);

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