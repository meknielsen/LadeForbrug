export function match(value) {
	return /^[0-9a-f]{24}$/.test(value);
}