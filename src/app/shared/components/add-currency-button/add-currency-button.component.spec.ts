import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCurrencyButtonComponent } from './add-currency-button.component';

describe('AddCurrencyButtonComponent', () => {
	let component: AddCurrencyButtonComponent;
	let fixture: ComponentFixture<AddCurrencyButtonComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AddCurrencyButtonComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(AddCurrencyButtonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
