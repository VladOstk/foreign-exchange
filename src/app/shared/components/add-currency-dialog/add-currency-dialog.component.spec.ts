import { MatDialog } from '@angular/material/dialog';
import { fireEvent, render, screen } from '@testing-library/angular';

import { AddCurrencyDialogComponent } from './add-currency-dialog.component';
import { AddCurrencyDialogService } from './add-currency-dialog.service';
import { of, throwError } from 'rxjs';

describe('AddCurrencyDialogComponent', () => {
	it('should show data required error', async () => {
		const mockAddCurrencyDialogService = new MockAddCurrencyDialogService();
		const mockDialog = new MockDialog();

		await Arrange.renderDialog(mockAddCurrencyDialogService, mockDialog);

		const currencyInput = screen.getByTestId('add-currency-input');

		fireEvent(currencyInput, new FocusEvent('focus'));
		fireEvent(currencyInput, new FocusEvent('blur'));

		const errorMessage = screen.getByTestId('error-message');

		expect(errorMessage.textContent).toEqual('Please enter currency pair');
	});

	it('should show error when input length < 6 chars', async () => {
		const mockAddCurrencyDialogService = new MockAddCurrencyDialogService();
		const mockDialog = new MockDialog();

		await Arrange.renderDialog(mockAddCurrencyDialogService, mockDialog);

		const currencyInput = screen.getByTestId('add-currency-input');

		fireEvent(currencyInput, new FocusEvent('focus'));
		fireEvent.input(currencyInput, { target: { value: 'TES' } });
		fireEvent(currencyInput, new FocusEvent('blur'));

		const errorMessage = screen.getByTestId('error-message');

		expect(errorMessage.textContent).toEqual(
			'Please follow next format: USDEUR',
		);
	});

	it('should show error when network call failed', async () => {
		const mockAddCurrencyDialogService = new MockAddCurrencyDialogService();
		mockAddCurrencyDialogService.getData = jest
			.fn()
			.mockReturnValue(throwError(() => new Error('test')));
		const mockDialog = new MockDialog();

		await Arrange.renderDialog(mockAddCurrencyDialogService, mockDialog);

		const currencyInput = screen.getByTestId('add-currency-input');

		fireEvent(currencyInput, new FocusEvent('focus'));
		fireEvent.input(currencyInput, { target: { value: 'USDEUR' } });
		fireEvent(currencyInput, new FocusEvent('blur'));

		const addButton = screen.getByTestId('add-button');

		fireEvent.click(addButton);

		const errorMessage = screen.getByTestId('error-message');

		expect(errorMessage.textContent).toEqual('A network error has occured');
		expect(mockDialog.closeAll).not.toHaveBeenCalled();
	});

	it('should update data when api call successful', async () => {
		const mockAddCurrencyDialogService = new MockAddCurrencyDialogService();
		mockAddCurrencyDialogService.getData = jest.fn().mockReturnValue(of(null));
		const mockDialog = new MockDialog();

		await Arrange.renderDialog(mockAddCurrencyDialogService, mockDialog);

		const currencyInput = screen.getByTestId('add-currency-input');

		fireEvent(currencyInput, new FocusEvent('focus'));
		fireEvent.input(currencyInput, { target: { value: 'USDEUR' } });
		fireEvent(currencyInput, new FocusEvent('blur'));

		const addButton = screen.getByTestId('add-button');

		fireEvent.click(addButton);

		expect(mockDialog.closeAll).toHaveBeenCalled();
	});

	const Arrange = {
		renderDialog: (
			addCurrencyDialogService: Partial<AddCurrencyDialogService>,
			dialog: Partial<MockDialog>,
		) => {
			return render('<app-add-currency-dialog></app-add-currency-dialog>', {
				imports: [AddCurrencyDialogComponent],
				providers: [
					{
						provide: AddCurrencyDialogService,
						useValue: addCurrencyDialogService,
					},
					{
						provide: MatDialog,
						useValue: dialog,
					},
				],
			});
		},
	};
});

class MockAddCurrencyDialogService
	implements Partial<AddCurrencyDialogService>
{
	getData = jest.fn();
}

class MockDialog implements Partial<MatDialog> {
	open = jest.fn();
	closeAll = jest.fn();
}
