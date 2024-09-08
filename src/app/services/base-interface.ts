export interface IResponse<T = void> {
	data: T;
	success: boolean;
	errorMessage: string;
	errors?: { [key: string]: string[] };
}
