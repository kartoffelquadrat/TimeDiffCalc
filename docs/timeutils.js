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

function updateDiffField(e) {
    // verify all required information is there

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
    document.getElementById('end-time-minutes-field').value = "";

    // Focus back to first field
    document.getElementById('start-time-hours-field').focus();
}

function addToHistory() {
    console.log("adding to history...");
}
