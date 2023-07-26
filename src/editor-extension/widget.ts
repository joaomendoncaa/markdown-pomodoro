import { EditorView, WidgetType } from "@codemirror/view";
import icons from "../icons";

export class PomodoroWidget extends WidgetType {
	constructor(readonly checked: boolean) {
		super();

		console.log(performance.now(), "PomodoroWidget:constructor");
	}

	toDOM(_: EditorView): HTMLElement {
		console.log(performance.now(), "PomodoroWidget:toDOM");

		let container = document.createElement("span");
		container.setAttribute("aria-hidden", "true");
		container.className = "cm-boolean-toggle";

		container.innerHTML = /*HTML*/ `
			<span class="pomodoro__widget-container">
				<input type="checkbox" />
				<span>25:00</span>
				<div class="pomodoro__widget-controls">
					<button class="pomodoro__widget-btn-play">${icons.play}</button>
					<button class="pomodoro__widget-btn-stopwatch">${icons.stopwatch}</button>
				</div>
			</span>
		`;

		return container;
	}
}
