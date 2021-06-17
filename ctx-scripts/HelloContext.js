
// Importing the "vscode" module, which contains the VS Code extensibility API
const vscode = require("vscode");

// ACTIVATION FUNCTION THAT IS TRIGGERED WHEN THE SCRIPT IS RUN
function activate() {

    // An additional function for using message output, as well as displaying error messages in the script
    ctxLog("Hello from the context to the output window!👋😎");

    // Displays the message in VS Code pop-up messages
    vscode.window.showInformationMessage("Hello from the context to pop-up messages!👋😎")

}

// Export the activation function to be called by extension
module.exports = { activate }
