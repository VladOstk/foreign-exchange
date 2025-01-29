import { Component, computed, input } from '@angular/core';

import { LinkButtonGroupComponent } from '../link-button-group/link-button-group.component';
import { LinkButtonGroupItem } from '../link-button-group/models';

import { NavigationBarRoute } from './models';

@Component({
	selector: 'app-navigation-bar',
	imports: [LinkButtonGroupComponent],
	templateUrl: './navigation-bar.component.html',
	styleUrl: './navigation-bar.component.scss',
})
export class NavigationBarComponent {
	routes = input.required<NavigationBarRoute[]>();

	protected linkButtonGroup = computed<LinkButtonGroupItem[]>(() =>
		this.routes().map((route) => ({
			label: route.title ?? '',
			path: route.path ?? '',
		})),
	);
}
