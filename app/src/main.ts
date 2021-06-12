
import * as vscode from 'vscode';

export function activate(_context: vscode.ExtensionContext) {

	vscode.window.showInformationMessage("Hello!!!");

	

	console.log('Active!');

}

export function deactivate() {
	console.log('Deactivate !');
}
