import { AppContext } from "./context";
import * as React from 'react';
import { App, TFile } from 'obsidian';

export const useApp = (): App => {
	return React.useContext(AppContext);
};

export const useActiveFile = (appContext: App): TFile | null => {
	return appContext.workspace.getActiveFile();
}
