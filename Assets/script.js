"use strict"

let currentHour = moment().hour();

/** Main page controller function, which runs upon loading page. Adds current date to top of page.
 * Adds event listeners to all buttons. Retrieves data from local storage. */
function main() {
    // Change the text at the top of the page to reflect the current date.
    $("#currentDay").text(moment().format("dddd, MMMM Do"));
    assignButtonsAndHours();
    retrieveStoredTasks();
}
main();

/** Triggered on button click. A function that stores text in the textarea in local storage, 
 * with the local storage key being the "time" data value attached to the clicked button.*/
function save() {
    localStorage.setItem($(this).data("time"), $(this).data("textarea").val());
}

/** Assign a time value to each $("textarea") and $("button") jQuery object. 
 * Then assign past, present, or future classes to textareas based on the time values, and currentHour. */
function assignButtonsAndHours() {
    for (let i = 0, j = $("textarea").length, time = 9; i < j; i++, time++) {
        // store a time value, 9 through 17, as data on each text area and button:
        $("textarea").eq(i).data("time", time);
        $("button").eq(i).data("time", time);
        // Next store a pointer to the associated textarea on each button:
        $("button").eq(i).data("textarea", $("textarea").eq(i));
        // Finally, add an event listener for the save function to each button:
        $("button").eq(i).on("click", save);
        $("button").eq(i).on("click", function() {
            $(".save-indicator").slideToggle("slow", function() {
                $(".save-indicator").slideToggle("slow");
            });
        });
        
        // Change the color of each textarea by changing the class, based upon the time of day:
        if (currentHour > $("textarea").eq(i).data("time")) {
            $("textarea").eq(i).attr("class", "col-md-10 past");
        }
        else if (currentHour === $("textarea").eq(i).data("time")) {
            $("textarea").eq(i).attr("class", "col-md-10 present");
        }
        else if (currentHour < $("textarea").eq(i).data("time")) {
            $("textarea").eq(i).attr("class", "col-md-10 future");
        }
    }
}

/** For each textarea, get the task text from local storage, and put it into the textarea. */
function retrieveStoredTasks() {
    for (let i = 0, j = $("textarea").length; i < j; i++) {
        let prevtextarea = localStorage.getItem($("textarea").eq(i).data("time"));
        if (prevtextarea === null) {
            prevtextarea = "";
        }
        $("textarea").eq(i).text(prevtextarea);
    }
}


let clockOn = true;
let currentTime;
// bug: only changes day upon page reload.