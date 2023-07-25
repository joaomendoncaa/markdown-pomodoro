export function minutesToMilliseconds(minutes: number): number {
	const wholeMinutes = Math.floor(minutes);
	const decimalMinutes = minutes - wholeMinutes;
	const millisecondsFromMinutes = wholeMinutes * 60 * 1000;
	const millisecondsFromDecimal = Math.round(decimalMinutes * 60 * 1000);
	const totalMilliseconds = millisecondsFromMinutes + millisecondsFromDecimal;

	return totalMilliseconds;
}
