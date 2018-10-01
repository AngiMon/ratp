export class Offer
{
	constructor(
		public rest: number,
		public type: string,
		public teamNb: number,
		public phone: string,
		public message: string,
		public askRef: Object,
		public user: Object,
		public response: boolean,
		public recent: boolean,)
	{}
}