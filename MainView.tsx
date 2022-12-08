import * as React from "react";
import { useApp } from "hooks";
import { MarkdownView } from "obsidian";
import { useState } from "react";
import * as azdev from "azure-devops-node-api";


export const ReactView = () => {

	const appContext = useApp();

	const [commands, setCommands] = useState<string[]>([]);

	React.useEffect(() => {
		const leaf = appContext.workspace.getMostRecentLeaf();
		if (leaf && leaf.view instanceof MarkdownView) {
			const all = leaf.view.data.split('\n');
			setCommands(all);

			// your collection url
			const orgUrl = all.find(x => x.contains("address"))?.split('=')[1].replace('}}', '');

			const token = all.find(x => x.contains("token"))?.split('=')[1].replace('}}', '');

			if (orgUrl && token) {
				const authHandler = azdev.getPersonalAccessTokenHandler(token);
				const connection = new azdev.WebApi(orgUrl, authHandler);

				const build = connection.getBuildApi();
				build.then(val => {

				})

				connection.getWorkApi().then(api => {
					api.getBacklogs({ project: '', team: '' }).then(backlogs => {
						console.log(backlogs)
					})
				})

				connection.getWorkItemTrackingApi().then(a => a.getQueries('').then(q => console.log(q)))
			}
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
