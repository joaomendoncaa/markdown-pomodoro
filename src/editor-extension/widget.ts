import { EditorView, WidgetType } from "@codemirror/view";
import icons from "../icons";

export class PomodoroWidget extends WidgetType {
	constructor(readonly checked: boolean) {
		super();
		console.log(performance.now(), "PomodoroWidget:constructor");
	}

	// eq(other: PomodoroWidget) {
	// 	console.log(performance.now(), "PomodoroWidget:eq");

	// 	return other.checked == this.checked;
	// }

	toDOM(_: EditorView): HTMLElement {
		console.log(performance.now(), "PomodoroWidget:toDOM");

		let container = document.createElement("div");
		container.setAttribute("aria-hidden", "true");
		container.className = "cm-boolean-toggle";

		container.innerHTML = /*HTML*/ `
			<div class="pomodoro__widget-container">
				<input type="checkbox" />
				<span>25:00</span>
				${icons.play}
			</div>
		`;

		return container;
	}
}
