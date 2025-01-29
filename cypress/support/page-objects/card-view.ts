import { AddCurrencyComponentHarness } from '../component-harnesses/add-currency-button';
import { AddCurrencyDialogComponentHarness } from '../component-harnesses/add-currency-dialog';

export class CardViewPageObject {
	addCurrencyButton = new AddCurrencyComponentHarness();
	addCurrencyDialog = new AddCurrencyDialogComponentHarness();

	visit() {
		cy.visit('/card');
	}
}
