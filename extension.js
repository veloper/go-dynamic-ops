// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	console.log('Extension activated.');

	// Command to insert the template
	let insertTemplate = vscode.commands.registerCommand('extension.newStructMethod', function () {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			const selection = editor.selection;
			const position = selection.start;

			// Get the nearest struct above the cursor
			const nearestStruct = getNearestStructAboveCursor(document, position);

			if (nearestStruct) {
				const structName = nearestStruct.structName;

				// Insert the template with the struct name
				const snippetText = `func (in *${structName}) ${structName.toLowerCase()}Method(\${2:args}) {\n\t$0\n}`;
				editor.insertSnippet(new vscode.SnippetString(snippetText), position);
			}
		}
	});

	// Register the command
	context.subscriptions.push(insertTemplate);
}

function getNearestStructAboveCursor(document, position) {
	for (let line = position.line - 1; line >= 0; line--) {
		const text = document.lineAt(line).text;
		const structMatch = /type\s+(\w+)\s+struct/.exec(text);
		if (structMatch) {
			return { structName: structMatch[1] };
		}
	}
	return null;
}

function deactivate() {
	console.log('Extension deactivated.');
}

module.exports = {
	activate,
	deactivate
}




