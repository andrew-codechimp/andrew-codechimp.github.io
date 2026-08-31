export interface PortfolioCategory {
	id: string;
	name: string;
	order: number;
}

export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
	{
		id: 'ha-integrations',
		name: 'Home Assistant Integrations',
		order: 1,
	},
	{
		id: 'ha-blueprints',
		name: 'Home Assistant Blueprints',
		order: 2,
	},	
	{
		id: 'other',
		name: 'Other',
		order: 3,
	},
];
