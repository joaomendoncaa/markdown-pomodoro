type Settings = {
	enhanceCheckboxesOnMdOpen: boolean;
};

type Task = {
	id: string;
	currentLine: number;
	timestampOnConclusion: number;
	elapsedToConclusion: number;
};

type Tasks = Task[];

type PluginEvent = {
	type: keyof GlobalEventHandlersEventMap | keyof DocumentEventMap;
	callback: (this: HTMLElement, ev: Event) => any;
};

type PluginEvents = {
	dom: PluginEvent[];
	load: PluginEvent[];
};
