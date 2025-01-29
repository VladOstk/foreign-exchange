import { Component, computed, inject } from '@angular/core';

import { CurrencyPairCardComponent } from '../../shared/components/currency-pair-card/currency-pair-card.component';
import { CurrencyPairManagerService } from '../../shared/services/currency-pair-manager/currency-pair-manager.service';
import { CurrencyPairCardData } from '../../shared/components/currency-pair-card/models';

@Component({
	selector: 'app-card-view',
	imports: [CurrencyPairCardComponent],
	templateUrl: './card-view.component.html',
	styleUrl: './card-view.component.scss',
})
export class CardViewComponent {
	private _currencyPairManagerService = inject(CurrencyPairManagerService);

	protected currencyPairCards = computed<CurrencyPairCardData[]>(() => {
		const currencyPairData = this._currencyPairManagerService.currencyPairs();

		return currencyPairData.map((data) => ({
			currencyPair: `${data.fromCurrencyCode}${data.toCurrencyCode}`,
			exchangeRate: data.exchangeRate,
			title: 'FX Live - Exchange Rates',
			lastFetched: this._currencyPairManagerService.dateLastUpdated(),
		}));
	});
}
