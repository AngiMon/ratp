export class Offer
{
	constructor(
		public repos: number,
		public type: string,
		public teamNb: number,
		public phone: string,
		public message: string,
		public askRef: Object,
		public user: Object)
	{}
}