export interface PortfolioCategory {
	id: string;
	name: string;
	order: number;
}

export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
	{
		id: 'home-assistant',
		name: 'Home Assistant Integrations',
		order: 1,
	},
	{
		id: 'other',
		name: 'Other',
		order: 2,
	},
];
