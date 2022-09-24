let last_start;
let last_end;
let last_diff;

function registerElementListeners() {

    // Update on any keystroke in input field (no return press required)
    document.getElementById('start-time-hours-field').addEventListener("keypress", function (e) {
        updateDiffField()
    });
    document.getElementById('start-time-minutes-field').addEventListener("keypress", function (e) {
        updateDiffField()
    });
    document.getElementById('end-time-hours-field').addEventListener("keypress", function (e) {
        updateDiffField()
    });
    document.getElementById('end-time-minutes-field').addEventListener("keypress", function (e) {
        updateDiffField()
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

async function updateDiffField(keyEvent, jumpOnTab) {

    let content = await produceTimeDelta();
    document.getElementById('result-diff-minutes').value = content;
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
    let startHours = document.getElementById('start-time-hours-field').value;
    let startMinutes = document.getElementById('start-time-minutes-field').value;
    let endHours = document.getElementById('end-time-hours-field').value;
    let endMinutes = document.getElementById('end-time-minutes-field').value;

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
    last_start = "Start: " + startHours + ":" + startMinutes
    last_end = "End: " + endHours + ":" + endMinutes
    last_diff = "Diff: " + diff;
    return diff;
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
    document.getElementById('start-time-hours-field').value = "";
    document.getElementById('start-time-minutes-field').value = "";
    document.getElementById('end-time-hours-field').value = "";
    document.getElementById('end-time-minutes-field').value = "";
    document.getElementById('result-diff-minutes').value = "---";

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
