function registerElementListeners() {

    // Update on any keystroke in input field (no return press required)
    document.getElementById('start-time-hours-field').addEventListener("keypress", function (e) {
        updateDiffField(e)
    });
    document.getElementById('start-time-minutes-field').addEventListener("keypress", function (e) {
        updateDiffField(e)
    });
    document.getElementById('end-time-hours-field').addEventListener("keypress", function (e) {
        updateDiffField(e)
    });
    document.getElementById('end-time-minutes-field').addEventListener("keypress", function (e) {
        updateDiffField(e)
    });

    // Reset on esc pressed
    document.onkeydown = function (evt) {
        evt = evt || window.event;
        let isEscape = false;
        if ("key" in evt) {
            isEscape = (evt.key === "Escape" || evt.key === "Esc");
        } else {
            isEscape = (evt.keyCode === 27);
        }
        if (isEscape) {
            clearAndReset()
        }
    };
}

function updateDiffField() {
    let content = produceTimeDelta();
    document.getElementById('result-diff-minutes').value = content;
}

function produceTimeDelta() {

    // verify all required information is there
    let startHours = document.getElementById('start-time-hours-field').value;
    let startMinutes = document.getElementById('start-time-minutes-field').value;
    let endHours = document.getElementById('end-time-hours-field').value;
    let endMinutes = document.getElementById('end-time-minutes-field').value;

    // If anything is empty, abort
    if (startHours === "" || startMinutes === "" || endHours === "" || endMinutes === "") {
        return "---";
    }

    // If anything is not a number, abort
    if (isNoPositiveInteger(startHours) || isNoPositiveInteger(startMinutes) || isNoPositiveInteger(endHours) || isNoPositiveInteger(endMinutes)) {
        return "---";
    }

    // Convert everything to minutes only
    let universalStartMinutes = 60 * startHours + startMinutes;
    let universalEndMinutes = 60 * endHours + endMinutes;

    return Math.abs(universalEndMinutes - universalStartMinutes)
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

    if (Number.isInteger(num) && num > 0) {
        return false;
    }

    return true;
}


function clearAndReset() {
    console.log("Clear and reset called.")

    // Add current values to history
    addToHistory()

    // Clear all input fields
    document.getElementById('start-time-hours-field').value = "";
    document.getElementById('start-time-minutes-field').value = "";
    document.getElementById('end-time-hours-field').value = "";
    document.getElementById('end-time-minutes-field').value = "";

    // Focus back to first field
    document.getElementById('start-time-hours-field').focus();
}

function addToHistory() {
    console.log("adding to history...");
}
