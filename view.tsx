import { ItemView, WorkspaceLeaf } from "obsidian";
import * as React from "react";
import { ReactView } from "MainView";
import { createRoot, Root } from "react-dom/client";
import { AppContext } from "./context";

export const VIEW_TYPE_EXAMPLE = "example-view";

export class ExampleView extends ItemView {
	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	}

	root: Root = {} as Root;

	getViewType() {
		return VIEW_TYPE_EXAMPLE;
	}

	getDisplayText() {
		return "Example view";
	}

	async onOpen() {
		this.root = createRoot(this.containerEl.children[1]);
		this.root.render(
			<AppContext.Provider value={this.app}>
				<ReactView />
			</AppContext.Provider>
		);
	}

	onChange() {
		this.root.unmount();
		this.onOpen();
	}

	async onClose() {
		// Nothing to clean up.
		this.root.unmount();
	}
}
