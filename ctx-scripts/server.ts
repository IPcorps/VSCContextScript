
// Importing the "vscode" module, which contains the VS Code extensibility API
import vscode from "vscode";
// Importing an http module to create a server
import http from "http";

// Declaring an extension function for message output
declare function ctxLog(data: string, newline?: boolean): void;
// Creating a server for receiving commands
const server = http.createServer();

// ACTIVATION FUNCTION THAT IS TRIGGERED WHEN THE SCRIPT IS RUN
function activate(params: { port: number }) {
    ctxLog("The server is running.");

    // Processing the client connection event and receiving the message.
    server.on("request", (req: http.IncomingMessage, res: http.ServerResponse) => {
        // The received command.
        let command = req.url?.substring(1);
        // Executing a command.
        if (command && command !== "favicon.ico") {
            ctxLog(`Executing a command: "${command}"`);
            vscode.commands.executeCommand(command)
        };
        // Sending a "response" to a waiting client.
        res.end();

    })

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
module.exports = { activate, deactivate }
