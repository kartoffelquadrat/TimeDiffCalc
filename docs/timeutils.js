function registerElementListeners() {

    // Update on any keystroke in input field (no return press required)
    document.getElementById('start-time-hours-field').addEventListener("keypress", function(e) {updateDiffField(e)});
    document.getElementById('start-time-minutes-field').addEventListener("keypress", function(e) {updateDiffField(e)});
    document.getElementById('end-time-hours-field').addEventListener("keypress", function(e) {updateDiffField(e)});
    document.getElementById('end-time-minutes-field').addEventListener("keypress", function(e) {updateDiffField(e)});
    document.getElementById('end-time-minutes-field').addEventListener("keypress", function(e) {updateDiffField(e)});

    // Register cache button
    document.getElementById("cache-button").addEventListener("click", () => addToHistory())
}

function updateDiffField(e) {
    if (e.key === "Escape") {
        alert("esc pressed!");
    } else {
        alert("A key was typed");
    }
}


function addToHistory() {
    alert("Extending history");
}
