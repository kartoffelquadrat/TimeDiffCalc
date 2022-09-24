let last_start;
let last_end;
let last_diff;

let start_time_hours_field;
let start_time_minutes_field;
let end_time_hours_field;
let end_time_minutes_field;
let offset_time_hours_field;
let offset_time_minutes_field;
let reset_history_button;
let result_diff_field;

function registerElementListeners() {

    start_time_hours_field = document.getElementById('start-time-hours-field');
    start_time_minutes_field = document.getElementById('start-time-minutes-field');
    end_time_hours_field = document.getElementById('end-time-hours-field');
    end_time_minutes_field = document.getElementById('end-time-minutes-field');
    offset_time_hours_field = document.getElementById('offset-time-hours-field');
    offset_time_minutes_field = document.getElementById('offset-time-minutes-field');
    reset_history_button = document.getElementById('reset-history');
    result_diff_field = document.getElementById('result-diff-minutes');

    // Add listener for special key presses
    // //Reset on enter pressed
    document.onkeydown = async function (evt) {
        evt = evt || window.event;
        if (evt.keyCode === 13) {
            clearAndReset()
        }
        // on every other key press update numbers without reset
        else {
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

    // Add padding where possible
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
    let endHours = end_time_hours_field.value;
    let endMinutes = end_time_minutes_field.value;

    // Pad everything that can be padded (integer and not focused)
    padInputFields();

    // If anything is empty, abort
    if (startHours === "" || startMinutes === "" || endHours === "" || endMinutes === "") {
        console.log("At least one input filed empty")
        return "---";
    }

    // If anything is not a number, abort
    if (isNoPositiveInteger(startHours) || isNoPositiveInteger(startMinutes) || isNoPositiveInteger(endHours) || isNoPositiveInteger(endMinutes)) {
        console.log("At least one input field not greater equal 0")
        return "---";
    }

    // Convert everything to minutes only
    let universalStartMinutes = 60 * parseInt(startHours) + parseInt(startMinutes);
    let universalEndMinutes = 60 * parseInt(endHours) + parseInt(endMinutes);

    let diff = Math.abs(universalEndMinutes - universalStartMinutes)
    last_start = "Start: " + startHours + ":" + addStringPadding(startMinutes)
    last_end = "End: " + endHours + ":" + addStringPadding(endMinutes)
    last_diff = "Diff: " + addStringPadding(diff);
    return diff;
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
    end_time_hours_field.value = "";
    end_time_minutes_field.value = "";
    offset_time_hours_field.value = "00";
    offset_time_minutes_field.value = "00";
    result_diff_field.value = "---";

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
        const diff_marker = document.createElement('p')
        diff_marker.innerText = last_diff

        // add everything to container
        marker_container.appendChild(start_marker)
        marker_container.appendChild(end_marker)
        marker_container.appendChild(diff_marker)

        // add container to history section
        document.getElementById("hx").appendChild(marker_container)
    }
}


function padInputFields() {

    let startHours = start_time_hours_field.value;
    let startMinutes = start_time_minutes_field.value;
    let endHours = end_time_hours_field.value;
    let endMinutes = end_time_minutes_field.value;

    // Add leading zeros to any non focused field
    if (!isNoPositiveInteger(startHours) && !isElementFocused(start_time_hours_field)) {
        start_time_hours_field.value = addStringPadding(startHours);
    }
    if (!isNoPositiveInteger(startMinutes) && !isElementFocused(end_time_minutes_field)) {
        start_time_minutes_field.value = addStringPadding(startMinutes);
    }
    if (!isNoPositiveInteger(endHours) && !isElementFocused(end_time_hours_field)) {
        end_time_hours_field.value = addStringPadding(endHours);
    }
    if (!isNoPositiveInteger(endMinutes) && !isElementFocused(end_time_minutes_field)) {
        end_time_minutes_field.value = addStringPadding(endMinutes);
    }
}

/**
 * https://stackoverflow.com/a/36430896
 */
function isElementFocused(element) {

// check for focus
    return (document.activeElement === element);
}