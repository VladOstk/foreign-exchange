import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';

import { CurrencyPair } from '../../shared/services/currency-pair-manager/models';
import { AlphaVantageGetResponse } from '../../shared/infrastructure/alpha-vantage-api/models';
import { CurrencyPairManagerService } from '../../shared/services/currency-pair-manager/currency-pair-manager.service';
import { AlphaVantageApiService } from '../../shared/infrastructure/alpha-vantage-api/alpha-vantage-api.service';

@Injectable({
	providedIn: 'root',
})
export class AddCurrencyDialogService {
	private _currencyPairManagerService = inject(CurrencyPairManagerService);
	private _alphaVantageApiService = inject(AlphaVantageApiService);

	getData(fromCurrencyCode: string, toCurrencyCode: string) {
		return this._alphaVantageApiService
			.get(fromCurrencyCode, toCurrencyCode)
			.pipe(
				tap((data) => {
					this.updateData(data);
				}),
			);
	}

	private updateData(alphaVantageResponse: AlphaVantageGetResponse) {
		const newCurrencyPair =
			this.adaptAlphaVantageToCurrencyPair(alphaVantageResponse);

		const currentPairs = this._currencyPairManagerService.currencyPairs();
		this._currencyPairManagerService.currencyPairs.set([
			...currentPairs,
			newCurrencyPair,
		]);
	}

	private adaptAlphaVantageToCurrencyPair(
		alphaVantageResponse: AlphaVantageGetResponse,
	): CurrencyPair {
		const currencyData =
			alphaVantageResponse['Realtime Currency Exchange Rate'];

		return {
			fromCurrencyCode: currencyData['1. From_Currency Code'],
			fromCurrencyName: currencyData['2. From_Currency Name'],
			toCurrencyCode: currencyData['3. To_Currency Code'],
			toCurrencyName: currencyData['4. To_Currency Name'],
			exchangeRate: currencyData['5. Exchange Rate'],
			lastRefreshed: currencyData['6. Last Refreshed'],
			timeZone: currencyData['7. Time Zone'],
			bidPrice: currencyData['8. Bid Price'],
			askPrice: currencyData['9. Ask Price'],
		};
	}
}
