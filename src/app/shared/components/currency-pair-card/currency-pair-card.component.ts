import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { CurrencyPairCardData } from './models';

@Component({
	selector: 'app-currency-pair-card',
	standalone: true,
	imports: [MatCardModule, DatePipe, DecimalPipe],
	templateUrl: './currency-pair-card.component.html',
	styleUrl: './currency-pair-card.component.scss',
})
export class CurrencyPairCardComponent {
	currencyPair = input.required<CurrencyPairCardData>();
}
