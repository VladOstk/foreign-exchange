import { aplhaVantageApiKey } from './constants';
import { Environment } from './models';

export const environment: Environment = {
	apiConfigs: {
		alphaVantage: {
			url: `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&apikey=${aplhaVantageApiKey}`,
		},
	},
};
