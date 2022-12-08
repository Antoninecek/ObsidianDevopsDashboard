import * as React from "react";
import { useApp } from "hooks";
import { MarkdownView } from "obsidian";
import { useState } from "react";

export const ReactView = () => {

	const appContext = useApp();

	const [commands, setCommands] = useState<string[]>([]);

	React.useEffect(() => {
		const leaf = appContext.workspace.getMostRecentLeaf();
		if (leaf && leaf.view instanceof MarkdownView) {
			setCommands(leaf.view.data.split('\n'));
		}
	}, [])

	return (
		<>
			<h4>Hello world!</h4>
			<>
				{commands.map(x => <div key={x} className={/{{[a-zA-Z]+}}/g.test(x) ? 'green' : 'blue'}>{x}</div>)}
			</>
		</>
	);
};
