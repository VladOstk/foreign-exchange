import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { cardRoutePath, gridRoutePath } from './app.routes';
import { NavigationBarRoute } from './shared/components/navigation-bar/models';
import { NavigationBarComponent } from './shared/components/navigation-bar/navigation-bar.component';
import { AddCurrencyButtonComponent } from './shared/components/add-currency-button/add-currency-button.component';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, NavigationBarComponent, AddCurrencyButtonComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	protected navigationBarRoutes: NavigationBarRoute[] = [
		{ title: 'Card', path: cardRoutePath },
		{ title: 'Grid', path: gridRoutePath },
	];
}
