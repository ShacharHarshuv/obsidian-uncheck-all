import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

const checkboxRegex = /((?:\n|^)\s*)- \[.\]/g;

export default class MyPlugin extends Plugin {
  private _uncheckAll() {
    const activeLeaf = this.app.workspace.activeLeaf;
    if (activeLeaf?.view instanceof MarkdownView) {
      const editor = activeLeaf.view.editor;
      const doc = editor.getDoc();
      const cursorPosition = doc.getCursor();
      const entireContent = doc.getValue();
      const updatedContent = entireContent.replace(checkboxRegex, "$1- [ ]");
      doc.setValue(updatedContent);
      doc.setCursor(cursorPosition);
    }
  }

	async onload() {
		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: 'uncheck-all',
			name: 'Uncheck All Checkboxes in File',
			callback: () => {
        this._uncheckAll();
			},
      editorCallback: (editor: Editor, view: MarkdownView) => {
        this._uncheckAll();
      },
		});
	}

	onunload() {

	}
}
