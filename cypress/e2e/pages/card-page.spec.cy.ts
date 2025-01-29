import { CardViewPageObject } from '../../support/page-objects/card-view';

describe('My First Test', () => {
	let cardViewPageObject: CardViewPageObject;

	beforeEach(() => {
		cardViewPageObject = new CardViewPageObject();

		cardViewPageObject.visit();
	});

	it('should add a card', () => {
		cardViewPageObject.addCurrencyButton.click();
		cardViewPageObject.addCurrencyDialog.enterCurrency('USDEUR');
		cardViewPageObject.addCurrencyDialog.clickAddButton();

		cy.get('mat-card').should('have.length', 2);
	});
});
