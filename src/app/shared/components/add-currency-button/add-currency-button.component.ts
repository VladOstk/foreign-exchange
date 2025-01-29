import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { AddCurrencyDialogComponent } from '../add-currency-dialog/add-currency-dialog.component';

@Component({
	selector: 'app-add-currency-button',
	imports: [MatButtonModule, MatDialogModule],
	standalone: true,
	templateUrl: './add-currency-button.component.html',
	styleUrl: './add-currency-button.component.scss',
})
export class AddCurrencyButtonComponent {
	private _dialog = inject(MatDialog);

	onButtonClick() {
		this._dialog.open(AddCurrencyDialogComponent);
	}
}
