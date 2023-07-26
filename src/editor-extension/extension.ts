import { syntaxTree } from "@codemirror/language";
import { RangeSetBuilder } from "@codemirror/state";
import {
	Decoration,
	DecorationSet,
	EditorView,
	PluginSpec,
	PluginValue,
	ViewPlugin,
	ViewUpdate,
	WidgetType,
} from "@codemirror/view";
import { PomodoroWidget } from "./widget";

class PomodoroCheckboxesPlugin implements PluginValue {
	decorations: DecorationSet;

	constructor(view: EditorView) {
		this.decorations = this.buildDecorations(view);
	}

	update(update: ViewUpdate) {
		this.decorations = this.buildDecorations(update.view);
	}

	buildDecorations(view: EditorView): DecorationSet {
		console.log(
			performance.now(),
			"PomodoroCheckboxesPlugin:buildDecorations"
		);

		const builder = new RangeSetBuilder<Decoration>();

		for (let { from, to } of view.visibleRanges) {
			syntaxTree(view.state).iterate({
				from,
				to,
				enter(syntaxNodeRef) {
					if (syntaxNodeRef.type.name.includes("task_meta")) {
						const listCharFrom = syntaxNodeRef.from - 2;

						builder.add(
							listCharFrom,
							listCharFrom + 6,
							Decoration.replace({
								widget: new PomodoroWidget(false),
							})
						);
					}
				},
			});
		}

		return builder.finish();
	}
}

const pluginSpec: PluginSpec<PomodoroCheckboxesPlugin> = {
	decorations: (value: PomodoroCheckboxesPlugin) => value.decorations,
};

export const pomodoroCheckboxesPlugin = ViewPlugin.fromClass(
	PomodoroCheckboxesPlugin,
	pluginSpec
);
