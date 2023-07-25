import { Plugin } from "obsidian";
import events from "./lib/events";
import { DEFAULT_SETTINGS } from "src/globals";
import SettingsTab from "./settings";
import {
	ViewUpdate,
	PluginValue,
	ViewPlugin,
	EditorView,
	WidgetType,
	Decoration,
	DecorationSet,
} from "@codemirror/view";
import { syntaxTree } from "@codemirror/language";
import {
	EditorState,
	StateField,
	Transaction,
	RangeSetBuilder,
	Extension,
} from "@codemirror/state";
import { pomodoroCheckboxesPlugin } from "./editor-extension/extension";

export default class MarkdownPomodoroPlugin extends Plugin {
	settings: Settings;

	async onload() {
		await this.loadSettings();

		this.addSettingTab(new SettingsTab(this.app, this));
		this.registerEditorExtension([pomodoroCheckboxesPlugin]);

		events.dom.forEach((event: PluginEvent) =>
			this.registerDomEvent(document, event.type, event.callback)
		);
	}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
