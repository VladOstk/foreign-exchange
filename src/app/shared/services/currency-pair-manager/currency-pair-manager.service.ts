import { computed, Injectable, signal } from '@angular/core';
import { CurrencyPair } from './models';

@Injectable({
	providedIn: 'root',
})
export class CurrencyPairManagerService {
	currencyPairs = signal<CurrencyPair[]>([
		{
			fromCurrencyCode: 'USD',
			fromCurrencyName: 'United States Dollar',
			toCurrencyCode: 'JPY',
			toCurrencyName: 'Japanese Yen',
			exchangeRate: '155.32700000',
			lastRefreshed: '2025-01-29 04:41:02',
			timeZone: 'UTC',
			bidPrice: '155.32010000',
			askPrice: '155.33000000',
		},
	]);

	dateLastUpdated = computed<string>(() => {
		this.currencyPairs();

		return new Date().toISOString();
	});
}
