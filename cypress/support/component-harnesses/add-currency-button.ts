export class AddCurrencyComponentHarness {
	click() {
		cy.get(`[data-testid="add-currency-button"]`).click();
	}
}
