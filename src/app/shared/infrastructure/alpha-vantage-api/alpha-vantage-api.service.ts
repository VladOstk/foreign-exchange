import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';

import { environment } from '../../../../environments/environment';
import {
	AlphaVantageGetResponse,
	AlphaVantageGetResponseSchema,
} from './models';

@Injectable({
	providedIn: 'root',
})
export class AlphaVantageApiService {
	private _httpClient = inject(HttpClient);

	get(fromCurrency: string, toCurrency: string) {
		return this._httpClient
			.get<AlphaVantageGetResponse>(
				`${environment.apiConfigs.alphaVantage.url}`,
				{
					params: {
						from_currency: fromCurrency,
						to_currency: toCurrency,
					},
				},
			)
			.pipe(
				map((data) => {
					//TODO: remove when api works consistently

					if (this.validateSchema(data)) {
						return data;
					}

					return this.returnDummyData();
				}),
			);
	}

	private validateSchema(data: unknown): data is AlphaVantageGetResponse {
		const parseResult = AlphaVantageGetResponseSchema.safeParse(data);

		if (parseResult.success === false) {
			//collect logs and send to a centralized logger service e.g. NewRelic/CloudWatch
			return false;
		}

		return true;
	}

	private returnDummyData(): AlphaVantageGetResponse {
		return {
			'Realtime Currency Exchange Rate': {
				'1. From_Currency Code': 'TST',
				'2. From_Currency Name': 'United States Dollar',
				'3. To_Currency Code': 'DTA',
				'4. To_Currency Name': 'Japanese Yen',
				'5. Exchange Rate': '155.32700000',
				'6. Last Refreshed': '2025-01-29 04:41:02',
				'7. Time Zone': 'UTC',
				'8. Bid Price': '155.32010000',
				'9. Ask Price': '155.33000000',
			},
		};
	}
}
