
// Yeah, this string  is what you're think about 🤓
import vscode from "vscode";

// The script metadata type obtained from the settings.json file
interface IScript {
	name: string,
	path: string,
	parameters?: object
}

// The type of module obtained from the script metadata path
type Module = NodeRequire & {
	mName: string,
	activate: (params?: {}) => void,
	deactivate?: () => void
}

// Redefining the global module to add our functionality
const ctxGlobal = global as typeof global & {
	ctxLog: (data: string, newline?: boolean) => void
};

// The status bar icon-button
const statBarBut = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
// A channel for displaying messages
// (for error messages, and as a feature for display messages in modules as a log function)
const ctxChannel = vscode.window.createOutputChannel("VSCContext");
// Array of scripts (as loaded modules)
const modules: Module[] = [];

// ACTIVATING THE EXTENSION AT STARTUP
export function activate({ subscriptions, workspaceState }: vscode.ExtensionContext) {

	// ID of the status bar command
	const commandOnId = "vsccontextscript.on";
	// The on/off flag of the script action, read by ID from the state store
	const statusOn = workspaceState.get(commandOnId, false);

	// Binding the click command ID to the icon in the status bar and displaying it
	statBarBut.command = commandOnId;
	statBarBut.show();

	// Registration of the event handler for the click on the icon in the status bar
	const commandOn = vscode.commands.registerCommand(commandOnId, () => {
		// When clicked: read the current state of the flag;
		// if enabled, read and process scripts;
		// if this option is disabled, clean and remove the modules;
		// then update the flag in the state store
		const statusOn = workspaceState.get(commandOnId, false);
		!statusOn ? run() : stop();
		workspaceState.update(commandOnId, !statusOn);
	});

	// Clearing objects when the extension is deactivated (including cleaning and deleting modules;)
	subscriptions.push(statBarBut, ctxChannel, commandOn, new vscode.Disposable(stop));

	// Processing the script launch when loading/activating the extension
	statusOn ? run() : stop();

}

// FUNCTION FOR LOADING AND PROCESSING SCRIPTS
function run() {

	// The text and tooltip of the icon-button.
	statBarBut.text = "Ctx: ON";
	statBarBut.tooltip = "Click to stop all scripts.";

	// Getting working folders from the project workspace
	const arrFolders = vscode.workspace.workspaceFolders;
	if (arrFolders)
		for (const folder of arrFolders) {

			// Getting the script metadata from the settings files.json in the current working folder
			const arrScripts: IScript[] | undefined = vscode.workspace.getConfiguration("", folder).get("contextScripts");
			if (arrScripts)
				for (const script of arrScripts) {
					// From the path in the metadata, get the script as a module; 
					// glue the name to the module (so that it doesn't get lost);
					// adding the resulting module to the general array of modules
					const path = `${folder.uri.fsPath}/${script.path}`;
					delete require.cache[require.resolve(path)];
					const module: Module = require(path);
					module.mName = script.name;
					modules.push(module);
					// Calling the activation function in the current module
					// with passing parameters read from the module metadata
					try { module.activate(script.parameters) }
					catch (error) { ctxGlobal.ctxLog(`<<< ${script.name} activate error >>>:\n${error.toString()}`) }
				}

		}

}

// FUNCTION OF DEACTIVATING MODULES AND CLEARING THEM WHEN DISABLED
function stop() {

	// The text and tooltip of the icon-button.
	statBarBut.text = "Ctx: OFF";
	statBarBut.tooltip = "Click to run all scripts";

	// If available, call deactivation functions in all modules
	for (const module of modules)
		// Iterating through the array of modules, with a call to the deactivation function on each one
		try { module.deactivate?.() }
		catch (error) { ctxGlobal.ctxLog(`<<< ${module.name} deactivate error >>>:\n${error.toString()}`) }

	// Clearing the array
	modules.length = 0;

}

// Output of messages to the output channel
ctxGlobal.ctxLog = (data: string, newline: boolean = true) => {
	newline ? ctxChannel.appendLine(data) : ctxChannel.append(data);
	ctxChannel.show(true);
}
