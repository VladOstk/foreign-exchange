export class AddCurrencyDialogComponentHarness {
	enterCurrency(currency: string) {
		cy.get(`[data-testid="add-currency-input"]`).type(currency);
	}

	clickAddButton() {
		cy.get(`[data-testid="add-button"]`).click();
	}
}
