function isAllCharsRepeatedValues(cnpjString: string) {
	const REMOVE_ALL_NON_DIGIT_REGEXP = /[^\d]+/g;
	const CHECK_FULL_CNPJ_SAME_CHAR_REPETITIONS_REGEXP = /(\d)\1{13}/g;
	return CHECK_FULL_CNPJ_SAME_CHAR_REPETITIONS_REGEXP.test(
		cnpjString.replace(REMOVE_ALL_NON_DIGIT_REGEXP, "")
	);
}

function firstVerificationDigit(cnpjDigits: number[]) {
	const multipliers = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
	const x =
		multipliers.reduce((result, multiplier, index) => {
			const matchingDigit = cnpjDigits[index];

			return result + matchingDigit * multiplier;
		}, 0) % 11;

	if (x < 2) {
		return 0;
	}
	return 11 - x;
}

function secondVerificationDigit(cnpjDigits: number[]) {
	const multipliers = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
	const x =
		multipliers.reduce((result, multiplier, index) => {
			const matchingDigit = cnpjDigits[index];

			return result + matchingDigit * multiplier;
		}, 0) % 11;

	if (x < 2) {
		return 0;
	}
	return 11 - x;
}

export function isValidCNPJ(value: string) {
	const digitsOnlyStr = value.replace(/[\s-/.]/g, "");

	// biome-ignore lint/style/useBlockStatements: required by CNPJ validation
	if (digitsOnlyStr.length !== 14 || isAllCharsRepeatedValues(value))
		return false;

	const cnpjDigits = digitsOnlyStr
		.split("")
		.map((digit) => Number.parseInt(digit, 10));

	return (
		cnpjDigits[12] === firstVerificationDigit(cnpjDigits) &&
		cnpjDigits[13] === secondVerificationDigit(cnpjDigits)
	);
}
