import * as vscode from 'vscode';
import { sfdxorgcreator } from './auth';
// import { nitesh } from './nitesh';
import {executes} from './execute';

export function activate(context: vscode.ExtensionContext) {
	
	
	vscode.window.showInformationMessage('Congratulations, your extension "cq-scratch-org-creator" is now active!');

	let disposable = vscode.commands.registerCommand('cq-scratch-org-creator.buildtrigger', () => {
	
		
		// const sfdx = sfdxorgcreator();

				// const ada = nitesh();
				const exec = executes();

	});

	context.subscriptions.push(disposable);
}


export function deactivate() {}
