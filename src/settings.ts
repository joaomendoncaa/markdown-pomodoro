import { App, PluginSettingTab, Setting } from "obsidian";
import MarkdownPomodoroPlugin from "./main";

export default class SettingsTab extends PluginSettingTab {
	plugin: MarkdownPomodoroPlugin;

	constructor(app: App, plugin: MarkdownPomodoroPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName("Run automatically on every .md file open.")
			.setDesc(
				"Choose wether you want checkboxes to be changed into pomodoro stopwatches everytime you launch a markdown file automatically."
			)
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.enhanceCheckboxesOnMdOpen)
					.onChange(async (value) => {
						this.plugin.settings.enhanceCheckboxesOnMdOpen = value;
						await this.plugin.saveSettings();
					})
			);
	}
}
