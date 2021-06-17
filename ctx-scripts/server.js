"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importing the "vscode" module, which contains the VS Code extensibility API
const vscode_1 = __importDefault(require("vscode"));
// Importing an http module to create a server
const http_1 = __importDefault(require("http"));
// Creating a server for receiving commands
const server = http_1.default.createServer();
// ACTIVATION FUNCTION THAT IS TRIGGERED WHEN THE SCRIPT IS RUN
function activate(params) {
    ctxLog("The server is running.");
    // Processing the client connection event and receiving the message.
    server.on("request", (req, res) => {
        // The received command.
        let command = req.url?.substring(1);
        // Executing a command.
        if (command && command !== "favicon.ico") {
            ctxLog(`Executing a command: "${command}"`);
            vscode_1.default.commands.executeCommand(command);
        }
        ;
        // Sending a "response" to a waiting client.
        res.end();
    });
    // Start listening for connections.
    server.listen(params.port);
}
// DEACTIVATION FUNCTION THAT STARTS WHEN THE SCRIPT IS TURNED OFF
function deactivate() {
    ctxLog("The server is stopped.");
    // Closing the server
    server.close();
}
// Export the activation function to be called by extension
module.exports = { activate, deactivate };
