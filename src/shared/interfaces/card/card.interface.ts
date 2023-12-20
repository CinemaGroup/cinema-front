export interface ICard {
	id: number,
	number: string,
	owner: string,
	month: number,
	year: number,
	cvv: number,
	isMain: boolean,
	createdAt: string,
}