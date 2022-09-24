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

    alert("A key was typed");

}


clearAndReset
