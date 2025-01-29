import { fireEvent, render, screen } from '@testing-library/angular';
import { MatDialog } from '@angular/material/dialog';

import { AddCurrencyDialogComponent } from '../add-currency-dialog/add-currency-dialog.component';
import { AddCurrencyButtonComponent } from './add-currency-button.component';

describe('AddCurrencyButtonComponent', () => {
	it('should open dialog', async () => {
		const mockDialog = new MockDialog();
		await Arrange.renderButton(mockDialog);

		const button = screen.getByTestId('add-currency-button');

		fireEvent(button, new MouseEvent('click'));

		expect(mockDialog.open).toHaveBeenCalledWith(AddCurrencyDialogComponent);
	});

	const Arrange = {
		renderButton: (dialog: Partial<MatDialog>) => {
			return render('<app-add-currency-button></app-add-currency-button>', {
				imports: [AddCurrencyButtonComponent],
				providers: [{ provide: MatDialog, useValue: dialog }],
			});
		},
	};
});

class MockDialog implements Partial<MatDialog> {
	open = jest.fn();
}
