export function stripTime(date: Date) {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
