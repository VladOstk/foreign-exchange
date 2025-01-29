import { Component, inject, signal, viewChild } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { catchError, throwError } from 'rxjs';

import { AddCurrencyDialogService } from './add-currency-dialog.service';

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
	protected networkError = signal<boolean>(false);
	protected formControl = viewChild.required<NgModel>('control');

	private _addCurrencyDialogService = inject(AddCurrencyDialogService);
	private _dialog = inject(MatDialog);

	onAddClick() {
		if (this.formControl().invalid) {
			return;
		}

		this.updateData();
	}

	private updateData() {
		this.networkError.set(false);

		const fromCurrencyCode = this.currencyPair().slice(0, 3);
		const toCurrencyCode = this.currencyPair().slice(3);

		this._addCurrencyDialogService
			.getData(fromCurrencyCode, toCurrencyCode)
			.pipe(
				catchError(() => {
					this.networkError.set(true);

					return throwError(() => null);
				}),
			)
			.subscribe({
				next: () => {
					this._dialog.closeAll();
				},
			});
	}
}
