export type RegisterFormField =
	// First-step (PersonalInformationForm)
	| "name"
	| "lastname"
	| "email"
	| "phone"
	| "supportPhone"
	| "password"
	| "confirmPassword"

	// Second-step (CompanyInformationForm)
	| "companyName"
	| "cnpj"
	| "monthlyRevenue"
	| "storeDomain"
	| "businessSegment"
	| "businessDescription"

	// Third-step (AddressInformationForm)
	| "street"
	| "number"
	| "complement"
	| "neighborhood"
	| "cep"
	| "city"
	| "state";

export const firstStepFields: RegisterFormField[] = [
	"name",
	"lastname",
	"email",
	"phone",
	"supportPhone",
	"password",
	"confirmPassword",
];
export const secondStepFields: RegisterFormField[] = [
	"companyName",
	"cnpj",
	"monthlyRevenue",
	"storeDomain",
	"businessSegment",
];
export const thirdStepFields: RegisterFormField[] = [
	"street",
	"number",
	"neighborhood",
	"cep",
	"city",
	"state",
];
