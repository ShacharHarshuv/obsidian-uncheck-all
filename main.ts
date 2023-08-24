import {
  Editor,
  MarkdownView,
  Plugin,
} from 'obsidian';

export default class UncheckAllPlugin extends Plugin {
  async onload() {
    // This adds a simple command that can be triggered anywhere
    this.addCommand({
      id: 'uncheck-all',
      name: 'Uncheck All Checkboxes in File',
      editorCallback: (editor: Editor, view: MarkdownView) => {
        const doc = editor.getDoc();
        const cursorPosition = doc.getCursor();
        const entireContent = doc.getValue();
        const updatedContent = entireContent.replace(/((?:\n|^)\s*)- \[.\]/g, "$1- [ ]");
        doc.setValue(updatedContent);
        doc.setCursor(cursorPosition);
      },
    });
  }

  onunload() {

  }
}
