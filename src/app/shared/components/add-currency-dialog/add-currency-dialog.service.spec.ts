import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AlphaVantageApiService } from '../../infrastructure/alpha-vantage-api/alpha-vantage-api.service';
import { AlphaVantageGetResponse } from '../../infrastructure/alpha-vantage-api/models';
import { CurrencyPairManagerService } from '../../services/currency-pair-manager/currency-pair-manager.service';
import { CurrencyPair } from '../../services/currency-pair-manager/models';
import { AddCurrencyDialogService } from './add-currency-dialog.service';

describe('AddCurrencyDialogService', () => {
	it('should update data in currencyPairManagerService', () => {
		const fromCurrencyCode = 'from';
		const toCurrencyCode = 'to';
		const existingCurrencyPair: CurrencyPair = {
			askPrice: '123.33000000',
			bidPrice: '123.32010000',
			exchangeRate: '123.32700000',
			fromCurrencyCode: 'EUR',
			fromCurrencyName: 'Euro',
			lastRefreshed: '2025-01-29 04:41:02',
			timeZone: 'UTC',
			toCurrencyCode: 'JPY',
			toCurrencyName: 'Japanese Yen',
		};
		const expectedCurrencyPair: CurrencyPair = {
			askPrice: '155.33000000',
			bidPrice: '155.32010000',
			exchangeRate: '155.32700000',
			fromCurrencyCode: 'USD',
			fromCurrencyName: 'United States Dollar',
			lastRefreshed: '2025-01-29 04:41:02',
			timeZone: 'UTC',
			toCurrencyCode: 'JPY',
			toCurrencyName: 'Japanese Yen',
		};
		const mockCurrencyPairManagerService = new MockCurrencyPairManagerService();
		const mockAlphaVantageApiService = new MockAlphaVantageApiService();
		mockAlphaVantageApiService.get = jest
			.fn()
			.mockReturnValue(of(mockAlphaVantageResponse));
		mockCurrencyPairManagerService.currencyPairs.set([existingCurrencyPair]);
		mockCurrencyPairManagerService.currencyPairs.set = jest.fn();

		Arrange.configureTestingModule(
			mockCurrencyPairManagerService,
			mockAlphaVantageApiService,
		);

		const dialogService = TestBed.inject(AddCurrencyDialogService);

		dialogService.getData(fromCurrencyCode, toCurrencyCode).subscribe();

		expect(mockAlphaVantageApiService.get).toHaveBeenCalledWith(
			fromCurrencyCode,
			toCurrencyCode,
		);
		expect(
			mockCurrencyPairManagerService.currencyPairs.set,
		).toHaveBeenCalledWith([existingCurrencyPair, expectedCurrencyPair]);
	});

	const Arrange = {
		configureTestingModule: (
			mockCurrencyPairManagerService: Partial<CurrencyPairManagerService>,
			mockAlphaVantageApiService: Partial<AlphaVantageApiService>,
		) => {
			TestBed.configureTestingModule({
				providers: [
					{
						provide: CurrencyPairManagerService,
						useValue: mockCurrencyPairManagerService,
					},
					{
						provide: AlphaVantageApiService,
						useValue: mockAlphaVantageApiService,
					},
				],
			});
		},
	};
});

class MockCurrencyPairManagerService
	implements Partial<CurrencyPairManagerService>
{
	currencyPairs = signal<CurrencyPair[]>([]);
}

const mockAlphaVantageResponse: AlphaVantageGetResponse = {
	'Realtime Currency Exchange Rate': {
		'1. From_Currency Code': 'USD',
		'2. From_Currency Name': 'United States Dollar',
		'3. To_Currency Code': 'JPY',
		'4. To_Currency Name': 'Japanese Yen',
		'5. Exchange Rate': '155.32700000',
		'6. Last Refreshed': '2025-01-29 04:41:02',
		'7. Time Zone': 'UTC',
		'8. Bid Price': '155.32010000',
		'9. Ask Price': '155.33000000',
	},
};

class MockAlphaVantageApiService implements Partial<AlphaVantageApiService> {
	get = jest.fn().mockReturnValue(of(null));
}
