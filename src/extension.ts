import * as vscode from 'vscode';
import { sfdxorgcreator } from './auth';
// import { nitesh } from './nitesh';


export function activate(context: vscode.ExtensionContext) {
	
	
	vscode.window.showInformationMessage('Congratulations, your extension "cq-scratch-org-creator" is now active!');

	let disposable = vscode.commands.registerCommand('cq-scratch-org-creator.buildtrigger', () => {
	
		
		const sfdx = sfdxorgcreator();
				// const ada = nitesh();

	});

	context.subscriptions.push(disposable);
}


export function deactivate() {}
