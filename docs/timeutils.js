let last_start;
let last_end;
let last_diff;
let last_offset;

let start_time_hours_field;
let start_time_minutes_field;
let start_time_seconds_field;
let end_time_hours_field;
let end_time_minutes_field;
let end_time_seconds_field;
let offset_time_seconds_field;
let reset_history_button;
let result_diff_field;

function registerElementListeners() {

    start_time_hours_field = document.getElementById('start-time-hours-field');
    start_time_minutes_field = document.getElementById('start-time-minutes-field');
    start_time_seconds_field = document.getElementById('start-time-seconds-field');
    end_time_hours_field = document.getElementById('end-time-hours-field');
    end_time_minutes_field = document.getElementById('end-time-minutes-field');
    end_time_seconds_field = document.getElementById('end-time-seconds-field');
    offset_time_seconds_field = document.getElementById('offset-time-seconds-field');
    reset_history_button = document.getElementById('reset-history');
    result_diff_field = document.getElementById('result-diff-seconds');

    // Add listener for special key presses
    // //Reset on enter pressed
    document.onkeydown = async function (evt) {
        evt = evt || window.event;
        if (evt.keyCode === 13) {
            clearAndReset()
        }
        // on every other key press update numbers without reset
        else if (evt.keyCode === 67) {
            await sleep(50); // sleep required to prevent character from showing in input field after typing.
            clearAndReset()
            resetHistory();
        } else {
            console.log("non enter press");
            await updateDiffField();
        }

    };

    // Reset history on key press
    reset_history_button.addEventListener("click", function (e) {
        resetHistory();
    });
}

async function updateDiffField(keyEvent, jumpOnTab) {

    // Update diff field if possible
    let content = await produceTimeDelta();
    result_diff_field.value = content;
}

function resetHistory() {

    document.getElementById("hx").innerHTML = "";
}

/**
 * https://stackoverflow.com/a/39914235
 * @param ms
 * @returns {Promise<unknown>}
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function produceTimeDelta() {

    // Wait a fraction of a second, so the filed value is actually updated
    await sleep(50);

    // verify all required information is there
    let startHours = start_time_hours_field.value;
    let startMinutes = start_time_minutes_field.value;
    let startSeconds = start_time_seconds_field.value;
    let endHours = end_time_hours_field.value;
    let endMinutes = end_time_minutes_field.value;
    let endSeconds = end_time_seconds_field.value;
    let offsetSeconds = offset_time_seconds_field.value;

    // Pad everything that can be padded (integer and not focused)
    padInputFields();

    // If anything is empty, abort
    if (startHours === "" || startMinutes === "" || startSeconds === "" || endHours === "" || endMinutes === "" || endSeconds === "" || offsetSeconds === "") {
        console.log("At least one input field empty")
        return "------";
    }

    // If any start / end is not a number, abort
    if (isNoPositiveInteger(startHours) || isNoPositiveInteger(startMinutes) || isNoPositiveInteger(startSeconds) || isNoPositiveInteger(endHours) || isNoPositiveInteger(endMinutes) || isNoPositiveInteger(endSeconds)) {
        console.log("At least one input field not greater equal 0")
        return "------";
    }

    // If offset not empty and not a number, abort
    if (offsetSeconds) {
        if (isNoPositiveInteger(offsetSeconds)) {
            return "------"
        }
    }

    // Convert everything to minutes only
    let universalStartSeconds = 60 * 60 * parseInt(startHours) + 60 * parseInt(startMinutes) + parseInt(startSeconds);
    let universalEndSeconds = 60 * 60 * parseInt(endHours) + 60 * parseInt(endMinutes) + parseInt(endSeconds);
    let universalOffsetSeconds = 0

    if (offset_time_seconds_field) {
        universalOffsetSeconds = parseInt(offsetSeconds);
    }

    let diff = Math.abs(universalEndSeconds - universalStartSeconds)
    diff = diff + universalOffsetSeconds;
    last_start = "Start: " + startHours + ":" + addStringPadding(startMinutes) + ":" + addStringPadding(startSeconds);
    last_end = "End: " + endHours + ":" + addStringPadding(endMinutes) + ":" + addStringPadding(endSeconds);
    last_offset = "Offset: " + addStringPadding(offsetSeconds);
    last_diff = "Diff: " + addStringPadding(diff) + breakDownDiff(diff);
    return diff;
}

/**
 * Converts pure second amount integer back to human readable HH:MM:SS string.
 * @param seconds
 */
function breakDownDiff(diff_seconds) {

    let bd_hours_int = Math.floor(diff_seconds / 3600);
    let bd_hours = addStringPadding(bd_hours_int.toString())
    let bd_minutes_int = addStringPadding(Math.floor((diff_seconds % 3600) / 60));
    let bd_minutes = addStringPadding(bd_minutes_int.toString())
    let bd_seconds_int = addStringPadding(diff_seconds % 60);
    let bd_seconds = addStringPadding(bd_seconds_int.toString())
    return " [" + bd_hours + ":" + bd_minutes + ":" + bd_seconds + "]";
}

function addStringPadding(string) {
    if (string.length == 1) {
        return "0" + string;
    }
    return string;
}


/**
 * Helper function to test if string is positive integer
 * See: https://bobbyhadz.com/blog/javascript-check-if-string-is-positive-integer
 * @param str
 * @returns {boolean}
 */
function isNoPositiveInteger(str) {
    if (typeof str !== 'string') {
        return true;
    }

    const num = Number(str);

    if (Number.isInteger(num) && num >= 0) {
        return false;
    }

    return true;
}


function clearAndReset() {
    console.log("Clear and reset called.")

    // Add current values to history
    addToHistory()

    // Clear all input fields
    start_time_hours_field.value = "";
    start_time_minutes_field.value = "";
    start_time_seconds_field.value = "";
    end_time_hours_field.value = "";
    end_time_minutes_field.value = "";
    end_time_seconds_field.value = "";
    offset_time_seconds_field.value = "00";
    result_diff_field.value = "------";

    // Focus back to first field
    document.getElementById('start-time-hours-field').focus();

    // Reset variable so history is not extended by future incomplete
    last_diff = ""
}

function addToHistory() {

    if (last_diff) {
        const marker_container = document.createElement('div');

        const start_marker = document.createElement('p')
        start_marker.innerText = last_start
        const end_marker = document.createElement('p')
        end_marker.innerText = last_end
        const offset_marker = document.createElement('p')
        offset_marker.innerText = last_offset
        const diff_marker = document.createElement('p')
        diff_marker.innerText = last_diff

        // add everything to container
        marker_container.appendChild(start_marker)
        marker_container.appendChild(end_marker)
        marker_container.appendChild(offset_marker)
        marker_container.appendChild(diff_marker)

        // add container to history section
        document.getElementById("hx").appendChild(marker_container)
    }
}


function padInputFields() {

    let startHours = start_time_hours_field.value;
    let startMinutes = start_time_minutes_field.value;
    let startSeconds = start_time_seconds_field.value;
    let endHours = end_time_hours_field.value;
    let endMinutes = end_time_minutes_field.value;
    let endSeconds = end_time_seconds_field.value;

    // Add leading zeros to any non focused field
    if (!isNoPositiveInteger(startHours) && !isElementFocused(start_time_hours_field)) {
        start_time_hours_field.value = addStringPadding(startHours);
    }
    if (!isNoPositiveInteger(startMinutes) && !isElementFocused(start_time_minutes_field)) {
        start_time_minutes_field.value = addStringPadding(startMinutes);
    }
    if (!isNoPositiveInteger(startSeconds) && !isElementFocused(start_time_seconds_field)) {
        start_time_seconds_field.value = addStringPadding(startSeconds);
    }
    if (!isNoPositiveInteger(endHours) && !isElementFocused(end_time_hours_field)) {
        end_time_hours_field.value = addStringPadding(endHours);
    }
    if (!isNoPositiveInteger(endMinutes) && !isElementFocused(end_time_minutes_field)) {
        end_time_minutes_field.value = addStringPadding(endMinutes);
    }
    if (!isNoPositiveInteger(endSeconds) && !isElementFocused(end_time_seconds_field)) {
        end_time_seconds_field.value = addStringPadding(endSeconds);
    }
}

/**
 * https://stackoverflow.com/a/36430896
 */
function isElementFocused(element) {

    // check for focus
    return (document.activeElement === element);
}