function registerElementListeners() {
    document.getElementById('start-time-hours-field').addEventListener("keypress", () => updateDiffField());
    document.getElementById('start-time-minutes-field').addEventListener("keypress", () => updateDiffField());
    document.getElementById('end-time-hours-field').addEventListener("keypress", () => updateDiffField());
    document.getElementById('end-time-minutes-field').addEventListener("keypress", () => updateDiffField());

}

function updateDiffField() {
    alert("A key was typed")
}

function addToHistory() {

}
