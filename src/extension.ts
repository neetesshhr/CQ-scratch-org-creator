
import * as vscode from 'vscode';
// import { build } from './build';
import { sfdxorgcreator } from './auth';

export function activate(context: vscode.ExtensionContext) {
	
	
	vscode.window.showInformationMessage('Congratulations, your extension "cq-scratch-org-creator" is now active!');

	let disposable = vscode.commands.registerCommand('cq-scratch-org-creator.buildtrigger', () => {
	
		
		const sfdx = sfdxorgcreator();

	});

	context.subscriptions.push(disposable);
}


export function deactivate() {}
