
// Importing the "vscode" module, which contains the VS Code extensibility API
const vscode = require("vscode");

// Unique ID of the command to start and stop the clock
// (using it, we will link the icon-clock button to the start and stop command)
const commandOnOffClockID = "ctx.clock";
// Icon-clock button in the status bar
const myClock = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 1000);
// Command to start and stop the clock
const commandOnOffClock = vscode.commands.registerCommand(commandOnOffClockID, clock);

// A Boolean flag and a clock timer object to be able to cancel it
let onFlag, timer;
// The function that will be executed by command (click on the clock icon), and start-stop the clock
function clock() {
    onFlag = !onFlag;
    if (onFlag) {
        timer = setInterval(() => {
            // Changes the text of the icon-clock button every second, displaying the current time
            myClock.text = new Date().toLocaleTimeString();
        }, 1000);
    } else clearInterval(timer);
}

// ACTIVATION FUNCTION THAT IS TRIGGERED WHEN THE SCRIPT IS RUN
function activate() {
    ctxLog("Activating the clock.");

    // Design and display the icon-clock button, and link it to the timer start and stop command
    myClock.tooltip = "It's my clock!";
    myClock.command = commandOnOffClockID;
    myClock.show();

    // The first launch of the function for displaying and launching the icon-clock button
    clock();

}

// DEACTIVATION FUNCTION THAT STARTS WHEN THE SCRIPT IS TURNED OFF
function deactivate() {
    ctxLog("Deactivating the clock.");

    // Clearing resources and stopping the timer when the script is disabled
    commandOnOffClock.dispose();
    myClock.dispose();
    if (timer) clearInterval(timer);

}

// Export the activation function to be called by extension
module.exports = { activate, deactivate }
