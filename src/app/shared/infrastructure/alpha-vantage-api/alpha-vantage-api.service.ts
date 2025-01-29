import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from '../../../../environments/environment';
import { AlphaVantageGetResponse } from './models';

@Injectable({
	providedIn: 'root',
})
export class AlphaVantageApiService {
	private _httpClient = inject(HttpClient);

	get(fromCurrency: string, toCurrency: string) {
		return this._httpClient.get<AlphaVantageGetResponse>(
			`${environment.apiConfigs.alphaVantage.url}`,
			{
				params: {
					from_currency: fromCurrency,
					to_currency: toCurrency,
				},
			},
		);
	}
}
