
import * as vscode from "vscode";

interface IScript {
	name: string,
	path: string,
	parameters: object
}

const statBarBut = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
const modules: any[] = [];

export function activate(context: vscode.ExtensionContext) {
	const { subscriptions, workspaceState } = context;
	const commandOnId = "vsccontextscript.on";
	const statusOn = workspaceState.get(commandOnId, false);

	statBarBut.tooltip = "Starts/stops all context scripts"
	statBarBut.command = commandOnId;
	statBarBut.show();
	subscriptions.push(statBarBut);

	subscriptions.push(vscode.commands.registerCommand(commandOnId, () => {
		const statusOn = workspaceState.get(commandOnId, false);
		!statusOn ? run(context) : stop();
		workspaceState.update(commandOnId, !statusOn);
	}));

	statusOn ? run(context) : stop();
}

export function deactivate() {
	stop();
}


function run({ subscriptions }: vscode.ExtensionContext) {
	statBarBut.text = "Ctx: ON";

	const arrFolders = vscode.workspace.workspaceFolders;
	if (arrFolders)
		for (const folder of arrFolders) {
			const arrScripts: IScript[] | undefined = vscode.workspace.getConfiguration("", folder).get("contextScripts");
			if (arrScripts)
				for (const script of arrScripts) {
					const module = require(`${folder.uri.fsPath}/${script.path}`);
					modules.push(module);
					module.activate?.({
						vscode,
						subscriptions,
						params: script.parameters
					});
				}
		}
}

function stop() {
	statBarBut.text = "Ctx: OFF";
	for (const module of modules) module.deactivate?.();
	modules.length = 0;
}
