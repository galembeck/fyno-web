/** biome-ignore-all lint/performance/useTopLevelRegex: required by CEP validation */

export function isValidCEP(value: string) {
	const cep = value.replace(/\D/g, "");
	return /^\d{8}$/.test(cep);
}
