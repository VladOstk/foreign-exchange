import { Component, computed, inject, input } from '@angular/core';
import { Router } from '@angular/router';

import { ButtonGroupComponent } from '../button-group/button-group.component';
import { ButtonGroupItem } from '../button-group/models';

import { NavigationBarRoute } from './models';

@Component({
	selector: 'app-navigation-bar',
	imports: [ButtonGroupComponent],
	templateUrl: './navigation-bar.component.html',
	styleUrl: './navigation-bar.component.scss',
})
export class NavigationBarComponent {
	routes = input.required<NavigationBarRoute[]>();

	private _router = inject(Router);

	protected buttonGroup = computed<ButtonGroupItem[]>(() =>
		this.routes().map((route) => ({
			label: route.title ?? '',
			id: route.title ?? '',
		})),
	);

	protected onActiveItemChange(item: ButtonGroupItem) {
		const destinationRoute = this.routes().find(
			(route) => route.title === item.id,
		);

		if (!destinationRoute) {
			return;
		}

		this._router.navigate([destinationRoute.path]);
	}
}
