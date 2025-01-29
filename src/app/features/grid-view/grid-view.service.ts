import { computed, inject, Injectable } from '@angular/core';

import { CurrencyPairManagerService } from '../../shared/services/currency-pair-manager/currency-pair-manager.service';
import { GridViewRowData } from './models';

@Injectable({
	providedIn: 'root',
})
export class GridViewService {
	private _currencyPairManagerService = inject(CurrencyPairManagerService);

	rowData = computed<GridViewRowData[]>(() => {
		const currencyPairs = this._currencyPairManagerService.currencyPairs();

		return currencyPairs.map((currencyPair) => ({
			askPrice: Number(currencyPair.askPrice),
			bidPrice: Number(currencyPair.askPrice),
			fromCurrencyCode: currencyPair.fromCurrencyCode,
			toCurrencyCode: currencyPair.toCurrencyCode,
			lastUpdated: currencyPair.lastRefreshed,
		}));
	});
}
