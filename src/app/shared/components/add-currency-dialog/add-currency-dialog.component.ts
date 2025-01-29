import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AlphaVantageApiService } from '../../infrastructure/alpha-vantage-api/alpha-vantage-api.service';
import { CurrencyPairManagerService } from '../../services/currency-pair-manager/currency-pair-manager.service';
import { FormsModule } from '@angular/forms';
import { CurrencyPair } from '../../services/currency-pair-manager/models';

@Component({
	selector: 'app-add-currency-dialog',
	imports: [
		MatDialogModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		FormsModule,
	],
	standalone: true,
	templateUrl: './add-currency-dialog.component.html',
	styleUrl: './add-currency-dialog.component.scss',
})
export class AddCurrencyDialogComponent {
	protected currencyPair = signal<string>('');

	private _alphaVantageApiService = inject(AlphaVantageApiService);
	private _currencyPairManagerService = inject(CurrencyPairManagerService);
	private _dialog = inject(MatDialog);

	onAddClick() {
		const fromCurrencyCode = this.currencyPair().slice(0, 3);
		const toCurrencyCode = this.currencyPair().slice(3);

		this._alphaVantageApiService
			.get(fromCurrencyCode, toCurrencyCode)
			.subscribe((data) => {
				const currentPairs = this._currencyPairManagerService.currencyPairs();
				const currencyData = data['Realtime Currency Exchange Rate'];
				const newCurrencyPair: CurrencyPair = {
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

				this._currencyPairManagerService.currencyPairs.set([
					...currentPairs,
					newCurrencyPair,
				]);

				this._dialog.closeAll();
			});
	}
}
