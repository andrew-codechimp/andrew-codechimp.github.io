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
		id: 'blueprints',
		name: 'Home Assistant Blueprints',
		order: 2,
	},	
	{
		id: 'other',
		name: 'Other',
		order: 3,
	},
];
